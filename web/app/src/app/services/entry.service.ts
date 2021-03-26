import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { ClassType } from '../types/class-type';
import { EntryType } from '../types/entry-type';
import { ClassesService } from './classes.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly all_entries: EntryType[] = [];

  constructor(private cs: ClassesService, private db: DatabaseService) {
    this.refreshEntries();
  }

  public refreshEntries(): void {
    this.db.getEntries().then((entries: EntryType[]) => {
      this.all_entries.splice(0, this.all_entries.length, ...entries);
    });
  }

  public getAllEntries(): EntryType[] {
    return this.all_entries;
  }

  public addEntry(category: EntryType.Category): Promise<EntryType> {
    return this.db.addEntry(category).then((entry: EntryType) => {
      this.refreshEntries();
      return entry;
    });
  }

  public deleteEntry(id: string): void {
    this.db.deleteEntry(id).then(() => {
      this.refreshEntries();
    });
  }

  public editEntry(id: string, name: string, parent: ClassType, due_date: Date, info: string[]): void {
    this.db.editEntry(id, name, parent, due_date, info).then(() => {
      this.refreshEntries();
    });
  }

  public changeEntryCategory(id: string, category: EntryType.Category): void {
    this.db.changeEntryCategory(id, category).then(() => this.refreshEntries());
  }

}
