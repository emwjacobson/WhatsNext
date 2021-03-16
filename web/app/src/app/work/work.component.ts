import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.less']
})
export class WorkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getTodoEntries() {
    console.log("Implement getTodoEntries()");
    return [];
  }

  public getInProgressEntries() {
    console.log("Implement getInProgressEntries()");
    return [];
  }

  public getDoneEntries() {
    console.log("Implement getDoneEntries()");
    return [];
  }

}
