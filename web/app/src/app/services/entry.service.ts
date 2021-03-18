import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { EntryType } from '../types/entry-type';
import { ClassesService } from './classes.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private readonly todo_entries: EntryType[] = [];
  private readonly in_progress_entries: EntryType[] = [];
  private readonly done_entries: EntryType[] = [];

  constructor(private cs: ClassesService) {
    let classes = this.cs.getClasses();
    this.todo_entries.push(
      new EntryType(0, classes[0], "Todo Assignment 1", new Date(2021, 2, 20)),
      new EntryType(1, classes[1], "Todo Assignment 2", new Date(2021, 2, 20)),
      new EntryType(2, classes[2], "Todo Assignment 3", new Date(2021, 2, 20))
    );

    this.in_progress_entries = [
      new EntryType(3, classes[0], "In Progress Assignment 1", new Date(2021, 2, 20)),
      new EntryType(4, classes[1], "In Progress Assignment 2", new Date(2021, 2, 20)),
      new EntryType(5, classes[2], "In Progress Assignment 3", new Date(2021, 2, 20))
    ]

    this.done_entries = [
      new EntryType(6, classes[0], "Done Assignment 1", new Date(2021, 2, 20)),
      new EntryType(7, classes[1], "Done Assignment 2", new Date(2021, 2, 20)),
      new EntryType(8, classes[2], "Done Assignment 3", new Date(2021, 2, 20))
    ]
  }

  public getTodoEntries(): EntryType[] {
    return this.todo_entries;
  }

  public getInProgressEntries(): EntryType[] {
    return this.in_progress_entries;
  }

  public getDoneEntries(): EntryType[] {
    return this.done_entries;
  }

  public addTodoEntry(): void {
    console.log("Implement addTodoEntry()");
  }

  // TODO: addInProgressEntry()
  // TODO: addDoneEntry()

  public deleteEntry(id: number): void {
    // We only have the id of the entry, as we don't know what list its in.
    // Because of this we need to search every list...

    let del_id = this.todo_entries.findIndex((entry: EntryType) => {
      return entry.getId() == id;
    });

    if (del_id != -1) {
      this.todo_entries.splice(del_id, 1);
      this.saveEntries();
      return;
    }

    del_id = this.in_progress_entries.findIndex((entry: EntryType) => {
      return entry.getId() == id;
    });

    if (del_id != -1) {
      this.todo_entries.splice(del_id, 1);
      this.saveEntries();
      return;
    }

    del_id = this.done_entries.findIndex((entry: EntryType) => {
      return entry.getId() == id;
    });

    if (del_id != -1) {
      this.done_entries.splice(del_id, 1);
      this.saveEntries();
      return;
    }
  }

  public reorderEntries(entries: EntryType[], before_index: number, after_index: number): void {
    moveItemInArray<EntryType>(entries, before_index, after_index);
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
