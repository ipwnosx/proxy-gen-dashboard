
export interface User {
    id: string;
    email: string;
    packages: UserPackages;
    username: string;   // proxy username
    password: string;   // proxy password
    wpUsername?: string; // wordpress username
}

export type UserPackages = Record<number, ProxyUsage>; // key corresponds to the ID of a proxy package in the packages collection

// export interface UserPackages {
//     [packageID: number]: ProxyUsage; // key corresponds to the ID of a proxy package in the packages collection
// }

export interface ProxyUsage {
    used: number;
    allotted: number;
}
