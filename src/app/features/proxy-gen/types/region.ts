

export interface Region {
    providerId: number;
    longname: string;
    shortname: string;
}

export type RegionsByProvider = Record<number, Region>;
export type longname = string;
