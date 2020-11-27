import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from '../../types/server';
import { ProxyPackage } from 'src/app/features/proxy-gen/types/proxy-package';
import { SettingsService } from 'src/app/features/proxy-gen/services/settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { User, UserPackages } from '../../types/user';
import { ApiUser, ApiProxyPackage } from '../../types/apiTypes';
import { map } from 'rxjs/operators';


// The rest api was actually created as an afterthought, so that's why we're
// converting the types received from the api back into the firebase format.
// The data format from the rest api is superior, but, not what we were 
// already using in this app.

@Injectable({
  providedIn: 'root'
})
export class PnpApiService {
  private _user: any;

  constructor(private settingsService: SettingsService,
              private http: HttpClient) { }

  getUser(): Observable<User> {
    const url = `${this.settingsService.apiBaseUrl}/users/${this.settingsService.email}/${this.settingsService.retrievalKey}`;

    return this.http.get<ApiUser>(url).pipe(
      map((user) => this.apiUserToUser(user))
    )

  }

  getServers(): Observable<Server[]> {
    const url = `${this.settingsService.apiBaseUrl}/servers`;
    return this.http.get<Server[]>(url).pipe(
      map((servers: Server[]) => {
        return servers.map(server => {
          server.optimizedForCodes = [];
          server.subDomain = "";
          return server;
        });
        
      })
    );
  }

  // get 'proxy networks' as referred to in api docs
  getPackages(): Observable<ProxyPackage[]> {
    const url = `${this.settingsService.apiBaseUrl}/proxy-networks`;
    return this.http.get<ApiProxyPackage[]>(url).pipe(
      map(pkgs => this.apiPackageToPackage(pkgs))
    );
  }

  // convert the proxy network object we get back from api into ProxyPackage
  private apiPackageToPackage(pkgs: ApiProxyPackage[]): ProxyPackage[] {

    return pkgs.map((pkg) => {
      return {
        id: pkg.id,
        name: pkg.name,
        regions: pkg.regions.map((r) => {
          return {
            providerId: r.provider_id,
            shortname: r.shortname,
            longname: r.longname
          }
        }),
        providers: pkg.proxy_providers
      }
    });

  }

  // convert the user that we get back from the api 
  private apiUserToUser(apiUser: ApiUser): User {
    let packages: UserPackages = {};

    for (const pkg of apiUser.proxy_networks) {
      packages[pkg.id] = {
        used: pkg.used,
        allotted: pkg.allotted,
      }
    }

    return {
      id: apiUser.id,
      email: apiUser.email,
      packages: packages,
      username: apiUser.proxy_username,
      password: apiUser.proxy_password,
    }
  }
}
