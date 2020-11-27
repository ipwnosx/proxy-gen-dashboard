import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProxyGenModule } from './features/proxy-gen/proxy-gen.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';


// Get firebase client creds.
// They are inserted into the page by the wp pnp plugin
let fbCreds = {};
try {
  fbCreds = JSON.parse((window.document.getElementById('pnp-fbClientCreds') as any).innerText);
} catch (e) {
  console.log(e);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(fbCreds),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    ProxyGenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
