import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  title: String = environment.title;
  pages: any[] = [
    { title: "Home", link: "/", exact: true},
    { title: "Classes", link: "/classes", exact: false },
    { title: "Work", link: "/work", exact: false }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
