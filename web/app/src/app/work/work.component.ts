declare var bootstrap: any;
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  private selected_entry: EntryType | undefined;

  @ViewChild('edit_entry_modal') private edit_entry_modal: ElementRef<HTMLDivElement> | undefined;

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
  }

  public addTodoEntry(): void {
    this.es.addTodoEntry();
  }

  public addInProgressEntry(): void {
    console.log("addInProgressEntry");
  }

  public addDoneEntry(): void {
    console.log("addDoneEntry");
  }

  public deleteEntry(id: number): void {
    if(window.confirm("Are you sure you want to delete this entry?")) {
      this.es.deleteEntry(id);
    }
  }

  public editEntry(entry: EntryType): void {
    if (!this.edit_entry_modal) return;
    let modal = new bootstrap.Modal(this.edit_entry_modal.nativeElement);

    let inner = this.edit_entry_modal.nativeElement.querySelector('.entry-name');
    let assn_name = this.edit_entry_modal.nativeElement.querySelector('#assignment-name') as HTMLInputElement;
    let due_date = this.edit_entry_modal.nativeElement.querySelector('#due-date') as HTMLInputElement;
    let assn_info = this.edit_entry_modal.nativeElement.querySelector('#assignment-info') as HTMLTextAreaElement;
    if(!inner || !assn_name || !due_date || !assn_info) return;

    inner.innerHTML = entry.getName();
    assn_name.value = entry.getName();
    due_date.value = entry.getDueDate().toDateString();
    assn_info.value = entry.getInfo() || "";

    this.selected_entry = entry;

    modal.show();
  }

  public confirmEditEntry(): void {
    if (!this.selected_entry || !this.edit_entry_modal) return;

    let inner = this.edit_entry_modal.nativeElement.querySelector('.entry-name');
    let assn_name = this.edit_entry_modal.nativeElement.querySelector('#assignment-name') as HTMLInputElement;
    let due_date = this.edit_entry_modal.nativeElement.querySelector('#due-date') as HTMLInputElement;
    let assn_info = this.edit_entry_modal.nativeElement.querySelector('#assignment-info') as HTMLTextAreaElement;
    if(!inner || !assn_name || !due_date || !assn_info) return;

    let date = new Date(due_date.value);
    if (!date) return;

    this.selected_entry.setName(assn_name.value);
    this.selected_entry.setDueDate(date);
    this.selected_entry.setInfo(assn_info.value);
  }

}
