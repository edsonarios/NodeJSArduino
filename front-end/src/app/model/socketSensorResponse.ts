export interface SocketResponse {
    type:string;
    pin: number;
    action: number;
}

export interface SocketLastValue {
    createdAt: string;
    id: number;
    value: string;
}
