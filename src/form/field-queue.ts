export interface IQueueValue {
    name: string;
    initialValue: any;
}

class FieldQueue {
    public queue: Promise<any>[] = [];

    public run = (promise: Promise<any>) => {
        this.queue.push(promise);
    };

    public next = (): Promise<any> | undefined => {
        return this.queue.shift();
    };

    public get empty(): Boolean {
        return !this.queue.length;
    }
}

export default FieldQueue;
