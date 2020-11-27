import { Injectable } from '@angular/core';
import { TableProxy } from '../../types/table-proxy';
import { SettingsService } from '../settings/settings.service';
import { StoreService } from 'src/app/core/services/store/store.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { take } from 'rxjs/operators';
import { ProxyPackage } from '../../types/proxy-package';
import { RegionsByProvider, longname, Region } from '../../types/region';
import { Server } from 'src/app/core/types/server';
import { SupportedCountriesService } from '../supported-countries/supported-countries.service';
import { randomIntInclusive } from 'src/app/core/utilities';
import { ModalService } from 'src/app/features/modal/modal.service';


@Injectable({
    providedIn: 'root'
})
export class ProxyGenerationService {

    constructor(private settingsService: SettingsService,
        private authService: AuthService,
        private store: StoreService,
        private supportedCountries: SupportedCountriesService,
        private modalService: ModalService) {

    }

    async genProxiesFromFormValue(formValue: { package: ProxyPackage, regionLongname: longname, quantity: number, type: string }) {

        const pkg = formValue.package;
        const quantity = formValue.quantity;
        let regionLongname = formValue.regionLongname;
        let isStatic: boolean = true;
        if (formValue.type == 'rotating') {
            isStatic = false;
        }

        let regions: Region[] = this.getRegions(regionLongname, pkg);

        const proxies: TableProxy[] = await this.genProxies(pkg, quantity, isStatic, regions);

        this.store.setTableProxies(proxies);
    }

    private getRegions(regionLongname: longname, pkg: ProxyPackage): Region[] {
        let regions: Region[] = [];

        if (regionLongname.toLowerCase() == 'random') {
            // need to make the Region objects ourselves
            for (let providerCode of pkg.providers) {
                regions.push({
                    providerId: providerCode,
                    longname: 'Random',
                    shortname: 'RR'
                });
            }

            return regions;
        }

        return pkg.regions.filter((r: Region) => r.longname == regionLongname);
    }

    private getServers(): Server[] {
        let servers: Server[];
        this.store.servers$.pipe(take(1)).subscribe((s: Server[]) => servers = s);
        if (servers.length == 0) {
            return [];
        }
        return servers;
    }

    private async genProxies(pkg: ProxyPackage,
        quantity: number,
        isStatic: boolean,
        regions: Region[]): Promise<TableProxy[]> {

        // providers this package supports
        let providers = pkg.providers;

        // get list of all the servers
        const servers: Server[] = this.getServers();
        if (servers.length == 0) {

            this.modalService.simpleMessage("Error", ["No Servers. Couldn't generate proxies."]);

            return [];
        }


        const usingPnpApi = !!this.settingsService.apiBaseUrl;

        const genArgs: GenProxiesArgs = {
            providerCodes: providers,
            quantity,
            servers,
            packageId: pkg.id,
            isStatic,
            regions,
            proxyDomain: this.settingsService.proxyDomain,
            username: usingPnpApi ? this.store.user.username : this.authService.user.username,
            password: usingPnpApi ? this.store.user.password : this.authService.user.password,
        }

        const proxies: TableProxy[] = this.doGen(genArgs);
        //console.log('new proxies: ', proxies);

        return proxies;
    }

    private doGen(args: GenProxiesArgs) {
        let providerSpread: ProviderSpread = this.spreadAcrossProviders(args.providerCodes, args.quantity);

        // determine servers that will be used for each provider
        providerSpread = this.determineServers(providerSpread, args.servers);

        // generate proxies for each provider
        providerSpread = this.genProxiesForProviderSpread(providerSpread, args.packageId, args.isStatic, args.regions);

        // join proxy lists for each provider into one list
        const proxies: TableProxy[] = this.providerSpreadToProxyList(providerSpread);

        return proxies;
    }

    // combine all proxy lists from inside the ProviderSpread object.
    // shuffle all proxies and then set ids
    private providerSpreadToProxyList(providerSpread: ProviderSpread): TableProxy[] {
        let proxies: TableProxy[] = [];

        for (const val of Object.values(providerSpread)) {
            const p = val.proxies;
            proxies = [...proxies, ...p];
        }

        proxies = this.shuffle(proxies);
        // reset id of each proxy since they've been shuffled
        for (let i = 0; i < proxies.length; i++) {
            proxies[i].id = i + 1;
        }

        return proxies;
    }

    // https://stackoverflow.com/a/2450976/6716264
    private shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    private genProxiesForProviderSpread(providerSpread: ProviderSpread, packageId: number, isStatic: boolean, regions: Region[]): ProviderSpread {
        // loop through each provider in ProviderSpread 
        for (const code of Object.keys(providerSpread)) {

            const providerCode: number = parseInt(code);

            let i = providerSpread[providerCode].quantity;

            const servers = providerSpread[providerCode].servers;
            const serverQuantity = providerSpread[providerCode].servers.length;

            let regionShortname = this.getRegionShortname(regions, providerCode);
            let regionLongname = this.getRegionLongname(regions, providerCode);

            while (i--) {
                const subDomain = servers[i % serverQuantity].subDomain;
                const fullDomain: string = `${subDomain}.${this.settingsService.proxyDomain}`;

                const proxy = new TableProxy({
                    domain: fullDomain,
                    username: this.authService.user.username,
                    password: this.authService.user.password,
                    packageId: this.numberToLetters(packageId),
                    providerCode: this.providerCodeToLetters(providerCode),
                    isStatic,
                    regionShortname,
                    regionLongname,
                });

                providerSpread[providerCode].proxies.push(proxy);
            }
        }

        return providerSpread;
    }

    getRegionLongname(regions: Region[], id: number): string {
        for (let region of regions) {
            if (region.providerId == id) {
                return region.longname;
            }
        }
        return regions[0].longname;
    }

    getRegionShortname(regions: Region[], id: number): string {
        for (let region of regions) {
            if (region.providerId == id) {
                return region.shortname;
            }
        }
        return regions[0].shortname;
    }

    // spreadAcrossProviders(providerCodes: number[], quantity: number): ProviderSpread {

    //     // make the result object like this: {2: 0, 1: 0, 4: 0, etc}
    //     let result = {};

    //     for (let code of providerCodes) {
    //         let spread_info: SpreadInfo = {
    //             quantity: 0,
    //             servers: [],
    //             proxies: [],
    //         };
    //         result[code] = spread_info;
    //     }

    //     // increment each value in object in rotation to spread evenly
    //     for (let i = 0; i < quantity; i++) {
    //         // TODO: if there are no providers we will get the error "attempt to calculate the remainder with a divisor of zero"
    //         let index = providerCodes[i % providerCodes.length];

    //         let spreadInfoItem: SpreadInfo = result[index];
    //         spreadInfoItem.quantity += 1;
    //     };

    //     return result;
    // }

    // determine number of proxies that should be made for each provider.
    // we want each provider to have an equal number of proxies.
    private spreadAcrossProviders(providerCodes: number[], quantity: number): ProviderSpread {

        let i = quantity;

        // make the result object like this: {2: 0, 1: 0, 4: 0, etc}
        const result: ProviderSpread = {};
        for (const code of providerCodes) {
            const spreadInfo: SpreadInfo = {
                quantity: 0,
                servers: [],
                proxies: [],
            }
            result[code] = spreadInfo;
        }

        // increment each value in object in rotation to spread evenly
        while (i--) {
            const keys = Object.keys(result);
            const rIndex = keys[i % keys.length];

            result[rIndex].quantity += 1;
        }

        return result;
    }

    // determine servers that should be used for each proxy provider.
    // we want to find the servers that are in the optimal location for each proxy provider.
    private determineServers(providerSpread: ProviderSpread, servers: Server[]): ProviderSpread {

        // loop through each provider in ProviderSpread 
        for (const code of Object.keys(providerSpread)) {

            const providerCode: number = parseInt(code);

            let serversOptimizedForProvider: Server[] = [];

            // loop through servers to find servers that are optimized for the
            servers.forEach((s: Server) => {

                if (s.optimizedForCodes.includes(providerCode)) {
                    serversOptimizedForProvider.push(s);
                }

            });

            // if there are no servers optimized for this provider, 
            // it will use all servers
            if (serversOptimizedForProvider.length == 0) {
                providerSpread[providerCode].servers = servers;
                continue;
            }

            providerSpread[providerCode].servers = serversOptimizedForProvider;
        }

        return providerSpread;
    }

    // encodes number provider code as a string of letters at least 2 digits long
    private providerCodeToLetters(code: number) {
        let encoded = this.numberToLetters(code);
        if (encoded.length < 2) {
            encoded = 'a' + encoded; // a stands for a 0 in our lettersToNumber object at bottom of page
        }
        return encoded;
    }

    private numberToLetters(id: number) {
        const idSplit = (id).toString(10).split("").map(function (t) { return parseInt(t) });
        return idSplit.map((d) => letterToNumber[d]).join("");
    }

}

const letterToNumber = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
}

type ProviderSpread = Record<number, SpreadInfo>;

interface SpreadInfo {
    quantity: number,
    servers: Server[],
    proxies: TableProxy[],
}

interface GenProxiesArgs {
    providerCodes: number[];
    quantity: number;
    servers: Server[];
    packageId: number;
    isStatic: boolean;
    regions: Region[];
    proxyDomain: string;
    username: string;
    password: string;
}