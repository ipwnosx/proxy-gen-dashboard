import { immerable } from 'immer';
import { randomIntInclusive, randomString } from '../../../core/utilities';

// represents and entry in the proxy generation table
export class TableProxy {
    [immerable] = true; // so we can use the immer library on this class for keeping state immutable

    id: number = 0; // just for use in table
    details: string; // domain:port:user:pass
    regionShortname: string;
    regionLongname: string;

    constructor(args: TableProxyArgs) {
        this.regionShortname = args.regionShortname;
        this.regionLongname = args.regionLongname;
        this.formatProxyDetails(args);
    }

    // format to domain:port:user:pass
    private formatProxyDetails(args: TableProxyArgs) {
        const formattedUsername: string = this.genFormattedUsername(args);

        this.details = `${args.domain}:9000:${formattedUsername}:${args.password}`
    }

    // anatomy of final formatted username.
    // (proxyUsername): (rotating / static): (country): (session key): (package ID)
    private genFormattedUsername(args: TableProxyArgs) {
        return args.username + // 8 characters
            this.staticOrRotatingCode(args.isStatic) + // 2 characters
            args.regionShortname + // 2 characters
            randomString(6) + // 6 characters
            args.providerCode + // 2 characters
            '-' +
            args.packageId; // variable number of characters

    }

    // encode 1 or 0 to letter pair. helps username appear a bit more random to the end user
    private staticOrRotatingCode(isStatic: boolean) {
        // 1 for static, 0 for rotating
        const letterPairs = isStatic ? letterPairToNumbers[1] : letterPairToNumbers[0];
        const randomPair = letterPairs[randomIntInclusive(0, letterPairs.length - 1)];
        return randomPair;
    }

}

export interface TableProxyArgs {
    domain: string; // proxy domain. may be different than site domain.
    username: string; // unique proxy username we get from firebase
    password: string; // proxy password we get from firebase
    packageId: string; // was already encoded as string by the proxy gen service
    providerCode: string; // was already encoded as string by the proxy gen service
    isStatic: boolean; // if it's not static, then it's rotating
    regionShortname: string; // 2 letter country code
    regionLongname: string;
}

// encode some options with this. helps username appear a bit more random to the end user
// do not think you can use any letters here. don't change these. they match up on super proxy server.
const letterPairToNumbers = {
    0: ["jb", "tg", "qm", "wc", "op", "xj", "dk", "ld", "of", "ox"],
    1: ["hk", "jx", "um", "iz", "dm", "pu", "vq", "on", "sy", "in"],
}