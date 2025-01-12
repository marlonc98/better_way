export enum WaiterStatus {
    NOT_STARTED = 'NOT_STARTED',
    WAITING = 'WAITING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export default interface WaiterEntity<T> {
    data?: T;
    error?: string;
    status: WaiterStatus;
}