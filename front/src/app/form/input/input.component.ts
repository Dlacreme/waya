import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Number = 'number',
  Textarea = 'textarea'
}

export interface InputOptions {
  label?:string;
  placeholder:string;
  default:any;
  type?:InputType;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  public form:FormGroup;

  public inputDefault:string;
  public inputLabel?:string;
  public inputPlaceholder:string;
  public inputType:InputType;

  constructor() { }

  @Output() onchange = new EventEmitter();

  @Input()
  set options(options:InputOptions) {
    this.inputLabel = options.label;
    this.inputPlaceholder = options.placeholder;
    this.inputDefault = options.default;
    this.inputType = options.type || InputType.Text;
  }

  public ngOnInit():void {
    this.form = new FormGroup({
      input: new FormControl(
        this.inputDefault,
        [Validators.required]
      )
    });
  }

  public submit():void {
    if (this.form.valid) {
      this.onchange.emit(this.form.controls.input.value);
    }
  }

}
