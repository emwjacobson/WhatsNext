import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { EntryType } from '../types/entry-type';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  public readonly todo_entries: EntryType[] = [];
  public readonly in_progress_entries: EntryType[] = [];
  public readonly done_entries: EntryType[] = [];

  constructor(private es: EntryService) {
    this.todo_entries = this.es.getTodoEntries();
    this.in_progress_entries = this.es.getInProgressEntries();
    this.done_entries = this.es.getDoneEntries();
  }

  ngOnInit(): void {
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
      this.es.reorderEntries(event.container.data, event.previousIndex, event.currentIndex);

    // If moving to a different list, then move to new list in correct position
    } else {
      this.es.transferEntry(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.es.saveEntries();
  }

}
