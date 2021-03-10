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

  public deleteClass(id: number | undefined) {
    if (!id) {
      return;
    }
    this.cs.deleteCourse(id);
  }

  public editInfo() {
    let elem: HTMLElement | null = document.getElementById('class-info');
    let modal = new bootstrap.Modal(document.getElementById('editInfoModal'));
    if (!elem || !modal) return;
    modal.show();
  }

  public submitEditCourseInfo() {
    let ta: HTMLTextAreaElement | null = document.getElementById("edit-textarea") as HTMLTextAreaElement;
    let modal = new bootstrap.Modal(document.getElementById('editInfoModal'));
    let id: number | undefined = this.getSelectedClass()?.getId();
    if (!modal || !ta || !ta.value || !id) return;

    this.cs.editCourseInfo(id, ta.value);
  }

}
