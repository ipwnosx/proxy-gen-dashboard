import { Injectable } from '@angular/core';

/**
 * Settings in this service are pull directly from divs in the dom. 
 * They are put there by the pnp wordpress plugin when the page loads.
 */

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _proxyDomain: string; // proxy tld. Could possibly be different than site tld.
  private _firebaseUsername: string; // only has user level permissions of course
  private _firebasePassword: string;

  // for use with api instead of firebase
  private _email: string; // = 'test@test.com';
  private _retrievalKey: string; // = 'supersecret';
  private _apiBaseUrl: string;// = 'http://127.0.0.1:9100/v1';


  constructor() { }

  get proxyDomain() {
    if (this._proxyDomain) {
      return this._proxyDomain;
    }
    return this._proxyDomain = this.getElementValById('pnp-proxyDomain');
  }
  set proxyDomain(val: string) {
    this._proxyDomain = val;
  }

  get firebaseUsername() {
    if (this._firebaseUsername) {
      return this._firebaseUsername;
    }
    return this._firebaseUsername = this.getElementValById('pnp-fbUsername');
  }
  set firebaseUsername(val: string) {
    this._firebaseUsername = val;
  }

  get firebasePassword() {
    if (this._firebasePassword) {
      return this._firebasePassword;
    }
    return this._firebasePassword = this.getElementValById('pnp-fbPassword');
  }
  set firebasePassword(val: string) {
    this._firebasePassword = val;
  }

  get email() {
    if (this._email) {
      return this._email;
    }
    return this._email = this.getElementValById('pnp-email');
  }
  set email(val: string) {
    this._email = val;
  }

  get retrievalKey() {
    if (this._retrievalKey) {
      return this._retrievalKey;
    }
    return this._retrievalKey = this.getElementValById('pnp-retrieval-key');
  }
  set retrievalKey(val: string) {
    this._retrievalKey = val;
  }

  get apiBaseUrl() {
    if (this._apiBaseUrl) {
      return this._apiBaseUrl;
    }
    return this._apiBaseUrl = this.getElementValById('pnp-api-base-url');
  }
  set apiBaseUrl(val: string) {
    this._apiBaseUrl = val;
  }

  // use this to pull our settings from divs on page
  private getElementValById(id: string) {
    let val;
    try {
      val = (window.document.getElementById(id) as any).innerText;
    } catch (e) {
      //console.error(e);
    }

    return val;
  }
}
