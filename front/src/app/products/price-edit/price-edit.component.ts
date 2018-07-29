import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Price } from '../../models/product';
import { InputOptions, InputType } from '../../form/input/input.component';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent {

  public data:Price;

  public baseOptions:InputOptions = {} as InputOptions;
  public memberOptions:InputOptions = {} as InputOptions;

  @Output() onchange = new EventEmitter();

  @Input()
  set price(price:Price) {
    this.data = price;
    this.initInput();
  }

  constructor() { }

  public updateBase(value:number):void {
    this.data.base = Number(value);
    this.submit();
  }

  public updateMember(value:number):void {
    this.data.member = Number(value);
    this.submit();
  }

  public submit():void {
    this.onchange.emit(this.data);
  }

  private initInput():void {
    this.baseOptions = {
      placeholder: 'Base Price',
      default: this.data.base,
      type: InputType.Number
    };
    this.memberOptions = {
      placeholder: 'Member Price',
      default: this.data.member,
      type: InputType.Number
    }
  }

}
