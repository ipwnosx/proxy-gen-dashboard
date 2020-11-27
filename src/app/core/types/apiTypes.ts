
export interface ApiUser {
    id: string; // firestore id
    proxy_networks: ApiUserPackage[];
    proxy_username: string;
    proxy_password: string;
    email: string;
    retrieval_key: string;
}

export interface ApiUserPackage {
    id: number; // id of the proxy package
    allotted: number;
    used: number;
}

export interface ApiProxyPackage {
    id: number;
    name: string;
    proxy_providers: number[];
    regions: ApiRegion[];
}

export interface ApiRegion {
    provider_id: number;
    longname: string;
    shortname: string;
}