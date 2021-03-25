import { Injectable } from '@angular/core';
import * as Appwrite from 'appwrite';
import { environment } from 'src/environments/environment';
import { ClassType } from '../types/class-type';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sdk: Appwrite;

  constructor() {
    this.sdk = new Appwrite();
    this.sdk.setEndpoint(environment.appwrite_endpoint)
            .setProject(environment.appwrite_project_id);

    // Guests cannot write to database, so log in this dummy user
    this.sdk.account.get().then((user) => {
    }).catch((error) => {
      this.sdk.account.createSession("guest@guest.com", "guestguest");
    });
  }

  public getClasses(): Promise<ClassType[]> {
    return this.sdk.database.listDocuments(environment.appwrite_classes_id)
    .then((res: any) => {
      return res.documents.map((entry: any) => {
        let new_class = new ClassType(entry.$id, entry.name);
        if (entry.info) new_class.setInfo(entry.info);
        if (entry.links) {
          let links:ClassType.ClassLink[] = [];
          entry.links.forEach((elem: any) => {
            links.push(new ClassType.ClassLink(elem.address, elem.text));
          });
          new_class.setLinks(links);
        }
        return new_class;
      });
    });
  }

  public addClass(class_name: string): Promise<void> {
    return this.sdk.database.createDocument(environment.appwrite_classes_id, {name: class_name}, ['*'], ['*'])
    .then((res) => {})
    .catch((err) => console.log("ERROR ADDING CLASS", err));
  }

  public deleteClass(id: string): Promise<void> {
    return this.sdk.database.deleteDocument(environment.appwrite_classes_id, id)
    .then((res) => {})
    .catch((err) => console.log("ERROR DELETING CLASS", err));
  }

  public setClassInfo(id: string, info: string[]): Promise<void> {
    return this.sdk.database.updateDocument(environment.appwrite_classes_id, id, {info: info}, ['*'], ['*'])
    .then((res) => {})
    .catch((err) => console.log("ERROR SETTING CLASS INFO", err));
  }

  public setClassLinks(id: string, links: ClassType.ClassLink[]): Promise<void> {
    return this.sdk.database.updateDocument(environment.appwrite_classes_id, id, {links: links}, ['*'], ['*'])
    .then(() => {})
    .catch((err) => console.log("ERROR SETTING CLASS LINKS", err));
  }
}
