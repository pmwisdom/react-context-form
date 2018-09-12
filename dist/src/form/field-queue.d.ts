export interface IQueueValue {
    name: string;
    initialValue: any;
}
declare class FieldQueue {
    queue: Promise<any>[];
    run: (promise: Promise<any>) => void;
    next: () => Promise<any> | undefined;
    readonly empty: Boolean;
}
export default FieldQueue;
