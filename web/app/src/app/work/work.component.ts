import { Component, OnInit } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { EntryType } from '../types/entry-type';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  private todo_entries: EntryType[] = [];
  private in_progress_entries: EntryType[] = [];
  private done_entries: EntryType[] = [];

  constructor(private es: EntryService) { }

  ngOnInit(): void {
    this.es.getTodoEntries().subscribe((entries) => {
      this.todo_entries = entries;
    });

    this.es.getInProgressEntries().subscribe((entries) => {
      this.in_progress_entries = entries;
    });

    this.es.getDoneEntries().subscribe((entries) => {
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

  public dragStart(event: DragEvent) {
    console.log("dragStart");
  }

  public dragEnd(event: DragEvent) {
    console.log("dragEnd")
  }

  public drag(event: DragEvent) {
    console.log("drag");
  }

  public drop(event: Event) {
    console.log(event);
    console.log("drop");
  }

}
