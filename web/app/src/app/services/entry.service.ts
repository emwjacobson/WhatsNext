import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { EntryType } from '../types/entry-type';
import { ClassesService } from './classes.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly all_entries: EntryType[] = [];

  constructor(private cs: ClassesService) {
    let classes = this.cs.getClasses();
    this.all_entries.push(
      new EntryType(0, classes[0], "Todo Assignment 1", new Date(2021, 2, 20), EntryType.Category.Todo),
      new EntryType(3, classes[0], "In Progress Assignment 1", new Date(2021, 2, 20), EntryType.Category.InProgress),
      new EntryType(6, classes[0], "Done Assignment 1", new Date(2021, 2, 20), EntryType.Category.Done),
      new EntryType(1, classes[1], "Todo Assignment 2", new Date(2021, 2, 20), EntryType.Category.Todo),
      new EntryType(4, classes[1], "In Progress Assignment 2", new Date(2021, 2, 20), EntryType.Category.InProgress),
      new EntryType(7, classes[1], "Done Assignment 2", new Date(2021, 2, 20), EntryType.Category.Done),
      new EntryType(2, classes[2], "Todo Assignment 3", new Date(2021, 2, 20), EntryType.Category.Todo),
      new EntryType(5, classes[2], "In Progress Assignment 3", new Date(2021, 2, 20), EntryType.Category.InProgress),
      new EntryType(8, classes[2], "Done Assignment 3", new Date(2021, 2, 20), EntryType.Category.Done),
    );
  }

  public getAllEntries(): EntryType[] {
    return this.all_entries;
  }

  public addEntry(category: EntryType.Category): EntryType {
    let max_id: number = Math.max.apply(Math, this.all_entries.map((entry: EntryType) => { return entry.getId() }));
    let new_entry: EntryType = new EntryType(max_id+1, undefined, "", new Date(), category);
    let index = this.all_entries.findIndex((entry: EntryType) => entry.getCategory() == category);
    this.all_entries.splice(index, 0, new_entry);
    return new_entry;
  }

  public deleteEntry(id: number): void {
    let del_id = this.all_entries.findIndex((entry: EntryType) => {
      return entry.getId() == id;
    });

    this.all_entries.splice(del_id, 1);
  }

  public reorderEntries(before_index: number, after_index: number): void {
    moveItemInArray<EntryType>(this.all_entries, before_index, after_index);
    this.saveEntries();
  }

  public transferEntry(before_list: EntryType[], after_list: EntryType[], before_index: number, after_index: number): void {
    transferArrayItem<EntryType>(before_list, after_list, before_index, after_index);
    this.saveEntries();
  }

  private saveEntries(): void {
    console.log("Saved Entries");
  }

}
