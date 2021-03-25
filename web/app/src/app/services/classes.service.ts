import { Injectable } from '@angular/core';
import { ClassType } from '../types/class-type';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly classes: ClassType[] = [];

  constructor(private db: DatabaseService) {
    this.refreshClasses();
  }

  private refreshClasses() {
    this.db.getClasses().then((classes) => {
      this.classes.splice(0, this.classes.length, ...classes);
    }).catch((err) => {
      console.log("Error fetching classes from database");
      console.log(err);
    });
  }

  public getClasses(): ClassType[] {
    return this.classes;
  }

  public addClass(name: string) {
    this.db.addClass(name).then(() => this.refreshClasses());
  }

  public deleteCourse(id: string) {
    // let index = this.classes.findIndex((cls) => cls.getId() == id);
    // this.classes.splice(index, 1);
    this.db.deleteClass(id).then(() => this.refreshClasses());
  }

  public editCourseInfo(id: string, info: string) {
    let info_split: string[] = info.split("\n");
    this.db.setClassInfo(id, info_split).then(() => this.refreshClasses());
  }

  public editCourseLinks(id: string, links: ClassType.ClassLink[]) {
    this.db.setClassLinks(id, links).then(() => this.refreshClasses());
  }
}
