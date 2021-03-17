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
      new EntryType(1, classes[0], "Todo Assignment 2", new Date(2021, 2, 20)),
      new EntryType(2, classes[0], "Todo Assignment 3", new Date(2021, 2, 20))
    );

    this.in_progress_entries = [
      new EntryType(3, classes[0], "In Progress Assignment 1", new Date(2021, 2, 20)),
      new EntryType(4, classes[0], "In Progress Assignment 2", new Date(2021, 2, 20)),
      new EntryType(5, classes[0], "In Progress Assignment 3", new Date(2021, 2, 20))
    ]

    this.done_entries = [
      new EntryType(6, classes[0], "Done Assignment 1", new Date(2021, 2, 20)),
      new EntryType(7, classes[0], "Done Assignment 2", new Date(2021, 2, 20)),
      new EntryType(8, classes[0], "Done Assignment 3", new Date(2021, 2, 20))
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

  public saveEntries(): void {
    console.log("Saved Entries");
  }

}
