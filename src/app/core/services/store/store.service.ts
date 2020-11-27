import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProxyPackage } from '../../../features/proxy-gen/types/proxy-package';
import { TableProxy } from '../../../features/proxy-gen/types/table-proxy';
import produce from 'immer';
import { pluck, switchMap, map, take, catchError, filter, tap } from 'rxjs/operators';
import { User, ProxyUsage, UserPackages } from '../../types/user';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Server } from '../../types/server';
import { SettingsService } from 'src/app/features/proxy-gen/services/settings/settings.service';
import { PnpApiService } from '../pnp-api/pnp-api.service';

/**
 * This is a relatively simple app, so we'll use a simple service as our store.
 * You can subscribe to the state observable to watch the state. 
 * Or subscribe to a slice of it.
 */

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _state = new BehaviorSubject<State>({} as State);

  // you can subscribe to the whole state
  readonly state$: Observable<State> = this._state.asObservable();

  // you can also subscribe to pieces of state
  packages$: Observable<ProxyPackage[]> = this.state$.pipe(pluck('packages'));
  selectedPackage$: Observable<ProxyPackage> = this.state$.pipe(pluck('selectedPackage'));
  tableProxies$: Observable<TableProxy[]> = this.state$.pipe(pluck('tableProxies'));
  servers$: Observable<Server[]> = this.state$.pipe(pluck('servers'));

  // only used if using the pnp api
  user: User;

  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private settingsService: SettingsService,
              private pnpApiService: PnpApiService,) {
    this.setInitialState();
  }

  private get currentState() {
    return this._state.getValue();
  }

  // Remember to keep this immutable.
  // We're using the immer library for that.
  private setState(newState: State) {
    this._state.next(newState);
  }

  private async setInitialState() {

    const pkgsFromStorage = this.pkgsFromLocalStorage();

    // The state the app is initialized with
    const state: State = {
      packages: pkgsFromStorage,
      selectedPackage: pkgsFromStorage.length > 0 ? pkgsFromStorage[0] : null,
      tableProxies: [],
      servers: [],
    };

    this.setState(state);

    if (!this.settingsService.apiBaseUrl) {
      // using firebase
      this.watchPackages();
      this.watchServersCollection();
    } else {
      // using pnp api
      this.user = await this.pnpApiService.getUser().toPromise();
      this.watchPackagesPNPApi();
      this.watchServersPNPApi();
    }


  }

  // get servers from pnp api instead of firebase
  private async watchServersPNPApi() {

    while (true) {
      const servers = await this.pnpApiService.getServers().toPromise();
      this.setServers(servers);

      await this.sleep(60);
    }

  }

  // get packages from pnp api instead of firebase
  private async watchPackagesPNPApi() {

    while (true) {
      const allPackages = await this.pnpApiService.getPackages().toPromise();

      const mergedPackages = this.mergeProxyPackages(allPackages, this.user.packages);

      this.setPackages(mergedPackages);

      this.resetSelectedPackage(mergedPackages);

      await this.sleep(60);
    }

  }

  private sleep(seconds: number) {
    const ms = seconds*1000;
    return new Promise((res) => setTimeout(res, ms));
  }

  // watch the servers collection to get subdomains of servers
  private watchServersCollection() {

    this.authService.user$
      .pipe(
        filter((user: User) => !!user),
        switchMap((user: User) => {

          // using valueChanges so that if any new servers are created,
          // they'll be added automatically.
          return this.afs.collection<Server>('servers').valueChanges()
            .pipe(
              catchError((error) => {
                console.error(error);
                return of([]);
              })
            )
        })
      )
      .subscribe((servers: Server[]) => {
        this.setServers(servers);
      })

  }

  // we want to merge the regions from the 'allProxyPackages' and the stats from the 'usersPackages'
  private mergeProxyPackages(allProxyPackages: ProxyPackage[], userPackages: UserPackages): ProxyPackage[] {
    
    const merged: ProxyPackage[] = [];
    
    // Loop through packages the user has already purchased,
    // and add bandwidth used and bandwidth allotted
    for (let id of Object.keys(userPackages)) {
      const pkg = allProxyPackages.find((p) => p.id == parseInt(id));
      const usage: ProxyUsage = userPackages[parseInt(id)];

      pkg.bwAllotted = usage.allotted;
      // if the user has used more than they're allotted, we don't want to display that.
      // we only want to display that they've used up the amount they were allotted.
      if (usage.used > usage.allotted) {
        pkg.bwUsed = usage.allotted;
      } else {
        pkg.bwUsed = usage.used;
      }

      merged.push(pkg);
    }

    return merged;
  }

  // set selected package to the package the user was already viewing if it exists in new data
  // else set it to first package in new data
  private resetSelectedPackage(pkgs: ProxyPackage[]) {
    this.selectedPackage$.pipe(take(1)).subscribe((p) => {

      const selectedPkgID: number = p && p.id;

      const newSelectedPkg: ProxyPackage = pkgs.find((p) => p.id == selectedPkgID);

      if (!newSelectedPkg) {

        this.setSelectedPackage(pkgs[0]); // not found. set selected to first in new list
        // clear any proxies in table too, because if they exist, they don't match the selected package
        this.setTableProxies([]);
        return;
      }

      this.setSelectedPackage(newSelectedPkg);
    });
  }

  // Set packages in state based on user doc and docs from package collection from firestore.
  // Don't unsubscribe, because if user doc changes, store packages will be updated.
  private watchPackages() {

    this.authService.user$
      .pipe(
        filter((user: User) => !!user),
        switchMap((user: User) => {

          // we only care about fetching more results from the packages collection if
          // the user document changes. So just use get() here not valueChanges().
          return this.afs.collection('packages').get()
            .pipe(
              map((snapshot) => {
                // All the proxy packages available for purchase. Grabbing from firestore.
                // We need the regions off of this document. That's why we're grabbing it.
                const allProxyPackages: ProxyPackage[] = snapshot.docs.map((doc) => doc.data() as ProxyPackage);

                return this.mergeProxyPackages(allProxyPackages, user.packages);
              }),
              catchError((error) => {
                console.error(error);
                return of([]);
              })
            )
        }),
        filter((pkgs: ProxyPackage[]) => pkgs && pkgs.length > 0),
      )
      .subscribe((pkgs: ProxyPackage[]) => {

        this.setPackages(pkgs);

        this.resetSelectedPackage(pkgs);
        
      });
  }

  setPackages(pkgs: ProxyPackage[]) {
    this.pkgsToLocalStorage(pkgs); // async

    const newState: State = produce(this.currentState, (draft: State) => {
      draft.packages = pkgs;
    });

    this.setState(newState);
  }

  setSelectedPackage(pkg: ProxyPackage) {
    const newState: State = produce(this.currentState, (draft: State) => {
      draft.selectedPackage = pkg;
    });
    this.setState(newState);
  }

  setTableProxies(proxies: TableProxy[]) {
    const newState: State = produce(this.currentState, (draft: State) => {
      draft.tableProxies = proxies;
    });
    this.setState(newState);
  }

  setServers(servers: Server[]) {
    const newState: State = produce(this.currentState, (draft: State) => {
      draft.servers = servers;
    });
    this.setState(newState);
  }


  // save packages to local storage so we can load up state quickly
  // on next page load
  private async pkgsToLocalStorage(pkgs: ProxyPackage[]) {
    const moddedPackages = produce(pkgs, (draft: ProxyPackage[]) => {
      draft.forEach((p) => {
        // Remove the bandwidth properties so that they won't be shown in UI
        // on next page load. They'll be grabbed from firebase.
        delete p.bwAllotted;
        delete p.bwUsed;
        // add user email so on next page load we can be sure we're loading packages from 
        // the correct user when we check local storage.
        // Set user const below based on whether we're using the api or not
        const user = this.settingsService.apiBaseUrl ? this.user : this.authService.user;
        (p as any).userEmail = user.email;
      })
    });
    localStorage.setItem('proxyPackages', moddedPackages ? JSON.stringify(moddedPackages) : null);
  }

  private pkgsFromLocalStorage(): ProxyPackage[] {
    const pkgDefault: ProxyPackage[] = [{
      id: 200000000,
      name: 'No packages',
      regions: null,//['No Regions'],
      providers: [],
      bwUsed: 0,
      bwAllotted:0,
    }];

    // we only want to return packages from the currently logged in user
    const packagesToReturn: ProxyPackage[] = [];

    let existingPackages = localStorage.getItem('proxyPackages');
    if(!existingPackages) {
      return pkgDefault;
    }

    try {
      existingPackages = JSON.parse(existingPackages);
    } catch(e) {
      return pkgDefault;
    }

    if (!Array.isArray(existingPackages)) {
      return pkgDefault;
    }

    // compare email to logged in user email to ensure we're not loading
    // another users packages
    (existingPackages as any[]).forEach((p) => {
      if (p.userEmail == this.settingsService.firebaseUsername) {
        delete p.userEmail;
        packagesToReturn.push(p as ProxyPackage);
      }
    });
      
    return packagesToReturn.length > 0 ? packagesToReturn : pkgDefault;
  }
}


interface State {

  // currently selected package in packages dropdown
  selectedPackage: ProxyPackage;

  // packages the user has actually purchased and can use.
  packages: ProxyPackage[];
  
  // proxies in the proxy generation table.
  tableProxies: TableProxy[];

  // we'll need these to generate the proxies
  servers: Server[];
  
}