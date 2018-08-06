import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService, StockTypeDto, StockFormatDto, StockUnitDto } from '../../api/stock.service';
import { InputOptions } from '../../form/input/input.component';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { MatSnackBar } from '@angular/material';

interface StockSubs {
  type:Subscription;
  format:Subscription;
  unit:Subscription;
}

interface EditableType {
  type:StockTypeDto;
  options:InputOptions;
}

interface EditableFormat {
  format:StockFormatDto;
  options:InputOptions;
  unitOptions:SelectOptions;
}

interface EditableUnit {
  unit:StockUnitDto;
  options:InputOptions;
}

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss']
})
export class AdminStockComponent implements OnInit, OnDestroy {

  public isEditable:boolean = false;

  public types:EditableType[] = [];
  public formats:EditableFormat[] = [];
  public units:EditableUnit[] = [];
  public unitItems:SelectItem[] = [];

  private dialogSub:Subscription = Subscription.EMPTY;
  private listSub:StockSubs = this.getEmptyStockSubs();
  private updateSub:StockSubs = this.getEmptyStockSubs();
  private createSub:StockSubs = this.getEmptyStockSubs();
  private deleteSub:StockSubs = this.getEmptyStockSubs();

  constructor(
    private stockService:StockService,
    private matSnackBar:MatSnackBar
  ) { }

  public ngOnInit():void {
    this.getDataLists();
  }

  public ngOnDestroy():void {
    this.dialogSub.unsubscribe();
    this.unsubscribeSubs(this.listSub);
    this.unsubscribeSubs(this.updateSub);
    this.unsubscribeSubs(this.createSub);
    this.unsubscribeSubs(this.deleteSub);
  }

  public switchEdit(isEditable:boolean):void {
    this.isEditable = isEditable;
  }


  // Type
  public updateTypeName(type:EditableType, value:string):void {
    type.type.name = value;
  }

  public updateType(type:EditableType):void {
    this.updateSub.type = this.stockService.typeUpdate(type.type)
      .subscribe(() => this.matSnackBar.open(`Type ${type.type.name} updated`, 'close'));
  }

  public createType(type:EditableType):void {
    this.createSub.type = this.stockService.typeCreate(type.type)
      .subscribe((res) => {
        if (res.data) {
          this.types.push({
            type: res.data,
            options: {
              placeholder: 'Name',
              default: res.data.name
            }
          });
        }
      });
  }


  // Format
  public updateFormatName(format:EditableFormat, value:string):void {
    format.format.name = value;
  }

  public updateFormat(format:EditableFormat):void {
    this.updateSub.format = this.stockService.formatUpdate(format.format)
      .subscribe(() => this.matSnackBar.open(`Type ${format.format.name} updated`, 'close'));
  }

  public createFormat(format:EditableFormat):void {
    this.createSub.format = this.stockService.formatCreate(format.format)
      .subscribe((res) => {
        if (res.data) {
          this.formats.push({
            format: res.data,
            options: {
              placeholder: 'Name',
              default: res.data.name
            },
            unitOptions: {
              placeholder: 'Unit',
              default: res.data.stock_unit.id,
              items: this.unitItems
            }
          });
        }
      });
  }

  // Unit
  public updateUnitName(unit:EditableUnit, value:string):void {
    unit.unit.name = value;
  }

  public updateUnit(unit:EditableUnit):void {
    this.updateSub.unit = this.stockService.unitUpdate(unit.unit)
      .subscribe(() => this.matSnackBar.open(`Type ${unit.unit.name} updated`, 'close'));
  }

  public createUnit(unit:EditableUnit):void {
    this.createSub.format = this.stockService.unitCreate(unit.unit)
      .subscribe((res) => {
        if (res.data) {
          this.units.push({
            unit: res.data,
            options: {
              placeholder: 'Name',
              default: res.data.name
            }
          });
        }
      });
  }


  private getDataLists():void {
    this.listSub.type = this.stockService.typeList()
      .subscribe((res) => this.types = res.data ? this.buildEditableTypes(res.data) : []);

    this.listSub.format = this.stockService.formatList()
      .subscribe((res) => this.formats = res.data ? this.buildEditableFormats(res.data) : []);

    this.listSub.unit = this.stockService.unitList()
      .subscribe((res) => {
        if (res.data) {
          res.data.forEach((item) => {
            this.unitItems.push({
              value: item.id,
              text: item.name
            });
            this.units.push({
              unit: item,
              options: {
                placeholder: 'Name',
                default: item.name
              }
            });
          });
        }
      });
  }

  private buildEditableTypes(types:StockTypeDto[]):EditableType[] {
    const res:EditableType[] = [];
    types.forEach((item) => res.push({
      type: item,
      options: {
        placeholder: 'Name',
        default: item.name
      }
    }));
    return res;
  }

  private buildEditableFormats(types:StockFormatDto[]):EditableFormat[] {
    const res:EditableFormat[] = [];
    types.forEach((item) => res.push({
      format: item,
      options: {
        placeholder: 'Name',
        default: item.name
      },
      unitOptions: {
        placeholder: 'Unit',
        default: item.stock_unit.id,
        items: this.unitItems
      }
    }));
    return res;
  }

  private getEmptyStockSubs():StockSubs {
    return {
      type: Subscription.EMPTY,
      format: Subscription.EMPTY,
      unit: Subscription.EMPTY
    };
  }

  private unsubscribeSubs(subs:StockSubs):void {
    subs.type.unsubscribe();
    subs.format.unsubscribe();
    subs.unit.unsubscribe();
  }

}
