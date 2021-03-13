import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassType } from '../types/class-type';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private classes: ClassType[] = [
    new ClassType(1, "ENGR 101I"),
    new ClassType(2, "ENGR 180W"),
    new ClassType(3, "CS 150"),
    new ClassType(4, "STAT 155")
  ];

  constructor() {
  }

  public getClasses(): Observable<ClassType[]> {
    return of(this.classes);
  }

  public addClass(name: string) {
    let max_id: number = Math.max.apply(Math, this.classes.map((cls) => { return cls.getId() }));
    this.classes.push(new ClassType(max_id+1, name));
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
