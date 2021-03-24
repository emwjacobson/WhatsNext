declare var bootstrap: any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../services/classes.service';
import { ClassType } from '../types/class-type';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.less']
})
export class ClassesComponent implements OnInit {
  @ViewChild('edit_class_modal') private edit_class_modal: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('delete_class_modal') private delete_class_modal: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('class_link_form') private class_link_form: ElementRef<HTMLFormElement> | undefined;
  @ViewChild('edit_info_textarea') private class_info_textbox: ElementRef<HTMLTextAreaElement> | undefined;

  private readonly classes: ClassType[] = [];
  private selected_class: String = "";
  public add_class_form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private cs: ClassesService,
              private route: ActivatedRoute) {
    this.classes = this.cs.getClasses();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.class_name) {
        this.selected_class = params.class_name;
      }
    });
  }

  public getClasses(): ClassType[] {
    return this.classes;
  }

  public getSelectedClass(): ClassType | undefined {
    let clazz: ClassType | undefined = this.classes.find((cls: ClassType) => {
      return cls.getName() == this.selected_class;
    });
    return clazz;
  }

  public submitAddClass(): void {
    let name: AbstractControl | null = this.add_class_form.get("name");
    if (!name) {
      console.log("Name was null...")
      return;
    }

    if (!name.value) {
      return;
    }

    this.cs.addClass(name.value);
    name.setValue("");
  }

  public deleteClass(): void {
    if (!this.delete_class_modal) return;
    let modal = new bootstrap.Modal(this.delete_class_modal.nativeElement);

    modal.show();
  }

  public confirmDeleteClass(): void {
    let selected_class = this.getSelectedClass();
    if (!selected_class) return;

    this.cs.deleteCourse(selected_class.getId());
  }

  public editClass(): void {
    let selected_class = this.getSelectedClass();
    if (!this.edit_class_modal || !this.class_link_form|| !this.class_info_textbox || !selected_class) return;
    let modal = new bootstrap.Modal(this.edit_class_modal.nativeElement);

    let link_form = this.class_link_form.nativeElement;
    let children: HTMLCollection = link_form.children;
    for(let i=0; i<children.length;i++) {
      if (children[i].id != "current-link") {
        link_form.removeChild(children[i]);
        i--;
      }
    }

    this.class_info_textbox.nativeElement.value = (selected_class.getInfo() || []).join("\n");
    modal.show();
  }

  public submitEditCourse(): void {
    let selected_class = this.getSelectedClass();
    if (!selected_class || !this.class_info_textbox || !this.class_link_form) return;

    let links: ClassType.ClassLink[] = [];
    let children: HTMLCollection = this.class_link_form.nativeElement.children;
    // This loops through the .row elements
    for(let i=0; i<children.length; i++) {
      let name_elem = (children[i].querySelector("#link-name") as HTMLInputElement);
      let addr_elem = (children[i].querySelector("#link-address") as HTMLInputElement);
      let name = name_elem.value;
      let address = addr_elem.value;
      if (!name || !address) {
        name_elem.value = "";
        addr_elem.value = "";
        continue;
      };
      links.push(new ClassType.ClassLink(address, name));
      name_elem.value = "";
      addr_elem.value = "";
    }

    if (this.class_info_textbox.nativeElement.value)
      this.cs.editCourseInfo(selected_class.getId(), this.class_info_textbox.nativeElement.value);
    if (links.length > 0)
      this.cs.editCourseLinks(selected_class.getId(), links);
  }

  public addNewLink(): void {
    let blank_link: HTMLDivElement | null = document.querySelector("#blank-link-item") as HTMLDivElement;
    if (!this.class_link_form || !blank_link) return;
    let clone = blank_link.cloneNode(true) as HTMLDivElement;
    clone.hidden = false;
    clone.id = "";
    this.class_link_form.nativeElement.appendChild(clone);
  }

}
