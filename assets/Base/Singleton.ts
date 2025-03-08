export default class Singleton {
    private static instance: any = null;
    static GetInstance<T>(): T {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
}