import { Injectable } from '@angular/core';
import * as Appwrite from 'appwrite';
import { environment } from 'src/environments/environment';
import { ClassType } from '../types/class-type';
import { EntryType } from '../types/entry-type';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sdk: Appwrite;

  private classes: ClassType[] = [];

  constructor() {
    this.sdk = new Appwrite();
    this.sdk.setEndpoint(environment.appwrite_endpoint)
            .setProject(environment.appwrite_project_id);

    // Guests cannot write to database, so log in as guest
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
    }).then((classes: ClassType[]) => {
      this.classes.splice(0, this.classes.length, ...classes);
      return classes;
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

  public getEntries(): Promise<EntryType[]> {
    return this.sdk.database.listDocuments(environment.appwrite_entry_id)
    .then((res: any) => {
      return res.documents.map((entry: any) => {
        let new_entry = new EntryType(entry.$id, undefined, entry.name, new Date(entry.due_date), entry.category);
        if (entry.parent_class) {
          let parent = this.classes.find((cls) => cls.getId() == entry.parent_class);
          if (parent) new_entry.setParentClass(parent);
        }
        if (entry.info) {
          new_entry.setInfo(entry.info);
        }
        return new_entry;
      });
    });
  }

  public addEntry(category: EntryType.Category): Promise<any> {
    return this.sdk.database.createDocument(environment.appwrite_entry_id, { name: "New Assignment", due_date: new Date(), category: category }, ['*'], ['*'])
    .then((entry: any) => {
      let new_entry = new EntryType(entry.$id, entry.parent_class, entry.name, new Date(entry.due_date), entry.category);

      if(entry.info) {
        new_entry.setInfo(entry.info);
      }

      return new_entry;
    });
  }

  public deleteEntry(id: string): Promise<void> {
    return this.sdk.database.deleteDocument(environment.appwrite_entry_id, id)
    .then((res) => {})
    .catch((err) => console.log("ERROR DELETING ENTRY", err));
  }

  public editEntry(id: string, name: string, parent: ClassType, due_date: Date, info: string[]): Promise<void> {
    return this.sdk.database.updateDocument(environment.appwrite_entry_id, id, { name: name, parent_class: parent.getId(), due_date: due_date, info:info }, ['*'], ['*'])
    .then(() => {})
    .catch((err) => console.log("ERROR UPDATING ENTRY", err));
  }

}
