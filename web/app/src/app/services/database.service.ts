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

  public addClass(clazz: ClassType): void {
    console.log(clazz);
    this.sdk.database.createDocument(environment.appwrite_classes_id, clazz, ['*'], ['*'])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }
}
