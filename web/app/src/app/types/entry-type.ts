import { ClassType } from "./class-type";

export class EntryType {
    private id: number;
    private parent_class: ClassType | undefined;
    private name: string;
    private due_date: Date;
    private category: EntryType.Category;
    private info?: string[];

    constructor(id: number, parent: ClassType | undefined, name: string, due_date: Date, category: EntryType.Category, info?: string[]) {
        this.id = id;
        this.parent_class = parent;
        this.name = name;
        this.due_date = due_date;
        this.category = category;
        this.info = info;
    }

    public getId(): number {
        return this.id;
    }

    public getParentClass(): ClassType | undefined {
        return this.parent_class;
    }

    public setParentClass(clazz: ClassType): void {
        this.parent_class = clazz;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDueDate(): Date {
        return this.due_date;
    }

    public setDueDate(date: Date): void {
        this.due_date = date;
    }

    public getCategory(): EntryType.Category {
        return this.category;
    }

    public setCategory(category: EntryType.Category): void {
        this.category = category;
    }

    public getInfo(): string[] | undefined {
        return this.info;
    }

    public setInfo(info: string[]): void {
        if (info.length == 0 || (info.length == 1 && info[0] == "")) {
            this.info = undefined;
            return;
        }
        this.info = info;
    }
}

export namespace EntryType {
    // Nested ClassLink class
    export enum Category {
        Todo,
        InProgress,
        Done
    }
}
