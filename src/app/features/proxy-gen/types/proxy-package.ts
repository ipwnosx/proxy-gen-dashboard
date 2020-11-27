
// this mirrors a proxy package document in firebase EXCEPT for 
// bwUsed and bwAllotted. (also regions)

import { Region } from './region';

// We'll pull those out of the user document and add them on
export interface ProxyPackage {
    id: number;
    name: string;
    regions: Region[];
    providers: number[]; // proxy provider codes
    bwUsed?: number;
    bwAllotted?: number;
}