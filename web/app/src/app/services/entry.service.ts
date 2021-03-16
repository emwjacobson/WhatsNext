import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassType } from '../types/class-type';
import { EntryType } from '../types/entry-type';
import { ClassesService } from './classes.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private todo_entries: EntryType[] = [];
  private in_progress_entries: EntryType[] = [];
  private done_entries: EntryType[] = [];

  constructor(private cs: ClassesService) {
    cs.getClasses().toPromise()
      .then((classes: ClassType[]) => {
        this.todo_entries = [
          new EntryType(classes[0], "Todo Assignment 1", new Date(2021, 2, 20)),
          new EntryType(classes[0], "Todo Assignment 2", new Date(2021, 2, 20)),
          new EntryType(classes[0], "Todo Assignment 3", new Date(2021, 2, 20))
        ];

        this.in_progress_entries = [
          new EntryType(classes[0], "In Progress Assignment 1", new Date(2021, 2, 20)),
          new EntryType(classes[0], "In Progress Assignment 2", new Date(2021, 2, 20)),
          new EntryType(classes[0], "In Progress Assignment 3", new Date(2021, 2, 20))
        ]

        this.done_entries = [
          new EntryType(classes[0], "Done Assignment 1", new Date(2021, 2, 20)),
          new EntryType(classes[0], "Done Assignment 2", new Date(2021, 2, 20)),
          new EntryType(classes[0], "Done Assignment 3", new Date(2021, 2, 20))
        ]
      })
      .catch((reason) => {
        console.log("Error getting classes:", reason);
      });
  }

  public getTodoEntries(): Observable<EntryType[]> {
    return of(this.todo_entries);
  }

  public getInProgressEntries(): Observable<EntryType[]> {
    return of(this.in_progress_entries);
  }

  public getDoneEntries(): Observable<EntryType[]> {
    return of(this.done_entries);
  }
}
