import { ClassType } from "./class-type";

export class EntryType {
    private parent_class: ClassType;

    constructor(parent: ClassType, info?: string, due_date?: Date) {
        this.parent_class = parent;
    }

    public getParentClass(): ClassType {
        return this.parent_class;
    }
}
