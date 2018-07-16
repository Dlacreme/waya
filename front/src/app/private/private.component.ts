import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  public menuOpen = false;

  constructor() { }

  ngOnInit() {
  }

  public switchSidenav():void {
    this.menuOpen = !this.menuOpen;
  }

}
