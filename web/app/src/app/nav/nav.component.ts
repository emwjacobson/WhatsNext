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
    { title: "Home", link: "/" },
    { title: "Classes", link: "/classes" },
    { title: "Work", link: "/work" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
