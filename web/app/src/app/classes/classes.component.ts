declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
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

  private classes: ClassType[] = [];
  private selected_class: String = "";
  public add_class_form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private cs: ClassesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cs.getClasses().subscribe((classes) => {
      this.classes = classes;
    });

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
      console.log("Name was nulll...")
      return;
    }

    if (!name.value) {
      return;
    }

    this.cs.addClass(name.value);
    name.setValue("");
  }

  public deleteClass(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.cs.deleteCourse(id);
  }

  public editInfo(): void {
    let modal = new bootstrap.Modal(document.getElementById('editInfoModal'));
    if (!modal) return;
    modal.show();
  }

  public editLinks(): void {
    let modal = new bootstrap.Modal(document.getElementById('editLinksModal'));
    if (!modal) return;
    modal.show();
  }

  public submitEditCourseInfo(): void {
    let ta: HTMLTextAreaElement | null = document.getElementById("edit-info-textarea") as HTMLTextAreaElement;
    let id: number | undefined = this.getSelectedClass()?.getId();
    if (!ta || !ta.value || !id) return;

    this.cs.editCourseInfo(id, ta.value);
  }

  public submitEditCourseLinks(): void {
    let form: HTMLFormElement | null = document.getElementById("class-link-form") as HTMLFormElement;
    let id: number | undefined = this.getSelectedClass()?.getId();
    if (!form || !id) return;
    console.log('poop');

    let links: ClassType.ClassLink[] = [];

    let children: HTMLCollection = form.children;
    // This loops through the .row elements
    for(let i=0; i<children.length; i++) {
      console.log('i', i);
      let name_elem = (children[i].querySelector("#link-name") as HTMLInputElement);
      let addr_elem = (children[i].querySelector("#link-address") as HTMLInputElement);
      let name = name_elem.value;
      let address = addr_elem.value;
      if (!name || !address) continue;
      links.push(new ClassType.ClassLink(address, name));
      name_elem.value = "";
      addr_elem.value = "";
    }

    console.log('asd');
    this.cs.editCourseLinks(id, links);
  }

}
