import { Injectable } from '@angular/core';
import { spLocationInfo, SpLocInfo } from './provider-locations/smartproxy';
import { luminatiStaticCountries, luminatiResidentialAndMobileCountries, luminatiDCCountries } from './provider-locations/luminati';

/**
 * A service for checking if a proxy provider supports a given country.
 * Used when generating proxies.
 */

@Injectable({
  providedIn: 'root'
})
export class SupportedCountriesService {
  private _spCountries: { [country: string]: boolean };

  constructor() { }

  // using getter for lazy initialization.
  private get smartProxyCountries() {
    if (this._spCountries) {
      return this._spCountries;
    }

    const countries: string[] = spLocationInfo.map((i: SpLocInfo) => i.abbr.toUpperCase());

    this._spCountries = {"RR": true}; // Make sure to add random as supported country
    for (const c of countries) {
      this._spCountries[c] = true;
    }

    return this._spCountries;
  }

  providerSupportsCountry(providerCode: number, countryCode: string): boolean {
    const countries = this.getSupportedCountries(providerCode);
    return countries.includes(countryCode);
  }

  getSupportedCountries(providerCode: number): string[] { // lazy initialize _spCountries
    let supportedCountries: any = {};

    switch(providerCode) {
      case 0:
        supportedCountries = luminatiStaticCountries;

      case 1:
      case 2:
        supportedCountries = luminatiResidentialAndMobileCountries;
        break;

      case 3:
        supportedCountries = luminatiDCCountries;
        break;

      case 4:
        supportedCountries = this.smartProxyCountries;
        break;

      case 5:
        supportedCountries["RR"] = true; // smart proxy datacenter is just random
        break;
    }
    

    return Object.keys(supportedCountries);
  }
}
