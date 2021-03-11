export class ClassType {
    private id: number;
    private name: string;
    private info?: string[];
    private links?: ClassType.ClassLink[];

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

    public getInfo(): string[] | undefined {
        return this.info;
    }

    public getLinks(): ClassType.ClassLink[] | undefined {
        return this.links;
    }

    public setInfo(info: string[]) {
        this.info = info;
    }

    public setLinks(links: ClassType.ClassLink[]) {
        this.links = links;
    }
}

export namespace ClassType {
    // Nested ClassLink class
    export class ClassLink {
        private address: string;
        private text: string;

        constructor(address: string, text: string) {
            this.address = address;
            this.text = text;
        }

        public getAddress(): string {
            return this.address;
        }

        public getText(): string {
            return this.text;
        }
    };
}