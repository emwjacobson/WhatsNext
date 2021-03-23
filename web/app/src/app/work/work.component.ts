declare var bootstrap: any;
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassesService } from '../services/classes.service';
import { EntryService } from '../services/entry.service';
import { ClassType } from '../types/class-type';
import { EntryType } from '../types/entry-type';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  // public readonly todo_entries: EntryType[];
  // public readonly in_progress_entries: EntryType[];
  // public readonly done_entries: EntryType[];
  public Category = EntryType.Category;
  public readonly all_entries: EntryType[];
  public selected_entry: EntryType | undefined;

  @ViewChild('edit_entry_modal') private edit_entry_modal: ElementRef<HTMLDivElement> | undefined;

  constructor(private es: EntryService, private cs: ClassesService) {
    // this.todo_entries = this.es.getEntriesByCategory(EntryType.Category.Todo);
    // this.in_progress_entries = this.es.getEntriesByCategory(EntryType.Category.InProgress);
    // this.done_entries = this.es.getEntriesByCategory(EntryType.Category.Done);
    this.all_entries = this.es.getAllEntries();
  }

  ngOnInit(): void {
  }

  public getClasses(): ClassType[] {
    return this.cs.getClasses();
  }

  public getTodoEntries(): EntryType[] {
    return this.es.getAllEntries().filter((entry) => entry.getCategory() == EntryType.Category.Todo);
  }

  public getInProgressEntries(): EntryType[] {
    return this.es.getAllEntries().filter((entry) => entry.getCategory() == EntryType.Category.InProgress);
  }

  public getDoneEntries(): EntryType[] {
    return this.es.getAllEntries().filter((entry) => entry.getCategory() == EntryType.Category.Done);
  }

  public drop(event: CdkDragDrop<EntryType.Category>): void {
    console.log(event);
    console.log(event.container === event.previousContainer);
    console.log(event.container.data, event.previousContainer.data);
    (event.item.data as EntryType).setCategory(event.container.data);
    // this.es.reorderEntries()
    // // If moving to the same list, then just rearrange the order
    // if (event.previousContainer === event.container) {
    //   this.es.reorderEntries(event.container.data, event.previousIndex, event.currentIndex);

    // // If moving to a different list, then move to new list in correct position
    // } else {
    //   this.es.transferEntry(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    // }
  }

  public addTodoEntry(): void {
    console.log("Implement addTodoEntry");
  }

  public addInProgressEntry(): void {
    console.log("Implement addInProgressEntry");
  }

  public addDoneEntry(): void {
    console.log("Implement addDoneEntry");
  }

  public deleteEntry(id: number): void {
    if(window.confirm("Are you sure you want to delete this entry?")) {
      this.es.deleteEntry(id);
    }
  }

  public editEntry(entry: EntryType): void {
    if (!this.edit_entry_modal) return;
    let modal = new bootstrap.Modal(this.edit_entry_modal.nativeElement);

    this.selected_entry = entry;

    modal.show();
  }

  public confirmEditEntry(): void {
    if (!this.selected_entry || !this.edit_entry_modal) return;

    let assn_name = this.edit_entry_modal.nativeElement.querySelector('#assignment-name') as HTMLInputElement;
    let selected_class = this.edit_entry_modal.nativeElement.querySelector('#assignment-parent') as HTMLSelectElement;
    let due_date = this.edit_entry_modal.nativeElement.querySelector('#due-date') as HTMLInputElement;
    let assn_info = this.edit_entry_modal.nativeElement.querySelector('#assignment-info') as HTMLTextAreaElement;
    if( !assn_name || !selected_class || !due_date || !assn_info) return;

    let date: Date = new Date(due_date.value);
    if (isNaN(date as any)) date = new Date();

    let new_parent = this.cs.getClasses().find((clazz) => clazz.getId().toString() == selected_class.value);
    if (!date || !new_parent) return;

    // TODO: Move the editing of entries to the EntryService
    this.selected_entry.setName(assn_name.value);
    this.selected_entry.setParentClass(new_parent);
    this.selected_entry.setDueDate(date);
    this.selected_entry.setInfo(assn_info.value.split("\n"));
  }

}
