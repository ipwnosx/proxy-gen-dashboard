import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { User } from '../../types/user';
import { SettingsService } from 'src/app/features/proxy-gen/services/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _user = new BehaviorSubject<User>(null);
  readonly user$: Observable<User> = this._user.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private settingsService: SettingsService,
  ) {


    if (!this.settingsService.apiBaseUrl) { // only signin to firebase if we are not using pnp api

      // Subscribe to auth state and log in if needed.
      // switchMap to user doc
      this.afAuth.authState
        .pipe(
          switchMap(user => {
            //return user ? this.userDoc(user) : this.signIn(); 
            if (!user || user.email != this.settingsService.firebaseUsername) {
              return this.signIn();
            }
            return this.userDoc(user);
          })
        )
        .subscribe((user: User) => {
          this._user.next(user);
        });
    }

  }

  get user() {
    return this._user.getValue();
  }

  private signIn() {
    return from(this.afAuth.signInWithEmailAndPassword(
      this.settingsService.firebaseUsername,
      this.settingsService.firebasePassword
    ))
      .pipe(
        map(() => null),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      ) 
  }

  private userDoc(user: any): Observable<User> {
    return this.afs.doc<User>(`users/${user.uid}`)
      .valueChanges()
      .pipe(
        //tap((doc) => console.log("user doc: ", doc)),
        map((user: User) => {
          if (!user.packages) {
            user.packages = {};
          }
          return user;
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
  }

}
