import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

export interface SelectItem {
  text:string;
  value:any;
}

export interface SelectOptions {
  label?:string;
  placeholder:string;
  default?:any|undefined;
  items:SelectItem[];
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  public form:FormGroup;

  public selectDefault:string;
  public selectLabel?:string;
  public selectPlaceholder:string;
  public selectItems:SelectItem[];

  @Output() onchange = new EventEmitter();

  @Input()
  set options(options:SelectOptions) {
    this.selectDefault = options.default ? options.default : '';
    this.selectLabel = options.label;
    this.selectPlaceholder = options.placeholder;
    this.selectItems = options.items;
  }

  constructor() { }

  public ngOnInit():void {
    this.form = new FormGroup({
      select: new FormControl(
        this.selectDefault,
        Validators.required
      )
    });
  }

  public submit(value:any):void {
    this.onchange.emit(value);
  }

}
