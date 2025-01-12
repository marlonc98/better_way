export enum WaiterStatus {
    WAITING = 'WAITING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export default interface WaiterEntity<T> {
    data?: T;
    error?: string;
    status: WaiterStatus;
}