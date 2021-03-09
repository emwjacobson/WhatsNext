import { Component, OnInit } from '@angular/core';
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

  constructor(private cs: ClassesService, private route: ActivatedRoute) { }

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
    return this.classes.find((cls: ClassType) => {
      return cls.name == this.selected_class;
    });
  }

}
