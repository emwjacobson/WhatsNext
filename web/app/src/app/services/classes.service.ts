import { Injectable } from '@angular/core';
import { ClassType } from '../types/class-type';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly classes: ClassType[] = [
    new ClassType(1, "ENGR 101I"),
    new ClassType(2, "ENGR 180W"),
    new ClassType(3, "CS 150"),
    new ClassType(4, "STAT 155")
  ];

  constructor(private db: DatabaseService) {
  }

  public getClasses(): ClassType[] {
    return this.classes;
  }

  public addClass(name: string) {
    let max_id: number = Math.max.apply(Math, this.classes.map((cls) => { return cls.getId() }));
    let new_class = new ClassType(max_id+1, name);
    // this.classes.push(new_class);
    this.db.addClass(new_class);
  }

  public deleteCourse(id: number) {
    let index = this.classes.findIndex((cls) => cls.getId() == id);
    this.classes.splice(index, 1);
  }

  public editCourseInfo(id: number, info: string) {
    let clazz: ClassType | undefined = this.classes.find((cls) => (cls.getId() == id));
    if (!clazz) return;
    let info_split: string[] = info.split("\n");
    clazz.setInfo(info_split);
  }

  public editCourseLinks(id: number, links: ClassType.ClassLink[]) {
    let clazz: ClassType | undefined = this.classes.find((cls) => (cls.getId() == id));
    if (!clazz) return;
    clazz.setLinks(links);
  }
}
