export class ClassType {
    private id: number;
    private name: string;
    private info?: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getInfo(): string | undefined {
        return this.info;
    }

    public setInfo(info: string) {
        this.info = info;
    }
}