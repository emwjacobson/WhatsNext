import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassType } from '../types/class-type';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private classes: ClassType[] = [
    { name: "ENGR 101I" },
    { name: "ENGR 180W" },
    { name: "CS 150" },
    { name: "STAT 155" }
  ];

  constructor() {
  }

  public getClasses(): Observable<ClassType[]> {
    return of(this.classes);
  }
}
