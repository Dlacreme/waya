import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

export interface PickerItem {
  text:string;
  value:any;
}

export interface PickerOptions {
  items:PickerItem[];
  default?:any;
}

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  public form:FormGroup;
  public pickerOptions:PickerOptions = {} as PickerOptions;

  @Input()
  set options(options:PickerOptions) {
    this.pickerOptions = options;
  }

  @Output() onchange = new EventEmitter();

  public ngOnInit():void {
    this.form = new FormGroup({
      picker: new FormControl(
        this.pickerOptions.default,
        Validators.required
      )
    });
  }

  public submit(value:any):void {
    this.onchange.emit(value);
  }

}
