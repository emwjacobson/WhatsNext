import { ClassType } from "./class-type";

export class EntryType {
    private id: number;
    private parent_class: ClassType;
    private name: string;
    private due_date: Date;
    private info?: string;

    constructor(id: number, parent: ClassType, name: string, due_date: Date, info?: string) {
        this.id = id;
        this.parent_class = parent;
        this.name = name;
        this.due_date = due_date;
        this.info = info;
    }

    public getId(): number {
        return this.id;
    }

    public getParentClass(): ClassType {
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

    public getInfo(): string | undefined {
        return this.info;
    }

    public setInfo(info: string): void {
        this.info = info;
    }

}
