import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { EntryType } from '../types/entry-type';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  public todo_entries: EntryType[] = [];
  public in_progress_entries: EntryType[] = [];
  public done_entries: EntryType[] = [];

  constructor(private es: EntryService) { }

  ngOnInit(): void {
    this.es.getTodoEntries().subscribe((entries: EntryType[]) => {
      console.log("Updated todo...");
      this.todo_entries = entries;
    });

    this.es.getInProgressEntries().subscribe((entries: EntryType[]) => {
      this.in_progress_entries = entries;
    });

    this.es.getDoneEntries().subscribe((entries: EntryType[]) => {
      this.done_entries = entries;
    });
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

  public drop(event: CdkDragDrop<EntryType[]>): void {
    // If moving to the same list, then just rearrange the order
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    // If moving to a different list, then move to new list in correct position
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.es.updateAllEntries(this.todo_entries, this.in_progress_entries, this.done_entries);
  }

}
