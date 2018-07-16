import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-title',
  templateUrl: './module-title.component.html',
  styleUrls: ['./module-title.component.scss']
})
export class ModuleTitleComponent implements OnInit {

  public moduleTitle:string;

  @Input()
  set title(title:string) {
    this.moduleTitle = title;
  }

  constructor() { }

  ngOnInit() {
  }

}
