

export interface Server {
    id: string;
    ip: string;
    subDomain: string;
    // codes of proxy providers that this server is optimized for
    optimizedForCodes: number[];  
}