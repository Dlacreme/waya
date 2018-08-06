import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService, StockTypeDto, StockFormatDto, StockUnitDto } from '../../api/stock.service';
import { InputOptions } from '../../form/input/input.component';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';

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

  public newType:EditableType;
  public newFormat:EditableFormat;
  public newUnit:EditableUnit;

  private dialogSub:StockSubs = this.getEmptyStockSubs();
  private listSub:StockSubs = this.getEmptyStockSubs();
  private updateSub:StockSubs = this.getEmptyStockSubs();
  private createSub:StockSubs = this.getEmptyStockSubs();
  private deleteSub:StockSubs = this.getEmptyStockSubs();

  constructor(
    private stockService:StockService,
    private matSnackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  public ngOnInit():void {
    this.getDataLists();
    this.initNew();
  }

  public ngOnDestroy():void {
    this.unsubscribeSubs(this.dialogSub);
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

  public openTypeDeleteValidation(type:EditableType):void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${type.type.name}?`
    });
    this.dialogSub.type = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub.type = this.stockService.typeDelete(type.type.id)
          .subscribe(() => {
            const index = this.types.findIndex((item) => item.type.id === type.type.id);
            if (index !== -1) {
              this.types.splice(index, 1);
            }
            this.matSnackBar.open(`${type.type.name} deleted.`, 'close', {duration: 5000})
          });
      }
    });
  }

  // Format
  public updateFormatName(format:EditableFormat, value:string):void {
    format.format.name = value;
  }

  public updateFormatUnit(format:EditableFormat, value:SelectItem):void {
    format.format.stock_unit_id = value.value;
  }

  public updateFormat(format:EditableFormat):void {
    this.updateSub.format = this.stockService.formatUpdate(format.format)
      .subscribe(() => this.matSnackBar.open(`Format ${format.format.name} updated`, 'close'));
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

  public openFormatDeleteValidation(format:EditableFormat):void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${format.format.name}?`
    });
    this.dialogSub.format = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub.format = this.stockService.formatDelete(format.format.id)
          .subscribe(() => {
            const index = this.formats.findIndex((item) => item.format.id === format.format.id);
            if (index !== -1) {
              this.formats.splice(index, 1);
            }
            this.matSnackBar.open(`${format.format.name} deleted.`, 'close', {duration: 5000})
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
      .subscribe(() => this.matSnackBar.open(`Unit ${unit.unit.name} updated`, 'close'));
  }

  public createUnit(unit:EditableUnit):void {
    this.createSub.unit = this.stockService.unitCreate(unit.unit)
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

  public openUnitDeleteValidation(unit:EditableUnit):void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${unit.unit.name}?`
    });
    this.dialogSub.unit = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub.unit = this.stockService.unitDelete(unit.unit.id)
          .subscribe(() => {
            const index = this.units.findIndex((item) => item.unit.id === unit.unit.id);
            if (index !== -1) {
              this.units.splice(index, 1);
            }
            this.matSnackBar.open(`${unit.unit.name} deleted.`, 'close', {duration: 5000})
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

  private initNew():void {
    this.newType = {
      type: {
        name: ''
      } as StockTypeDto,
      options: {
        placeholder: 'Create new Type',
        default: ''
      }
    }
    this.newFormat = {
      format: {
        name: ''
      } as StockFormatDto,
      options: {
        placeholder: 'Create new Format',
        default: ''
      },
      unitOptions: {
        placeholder: 'Pick a unit',
        items: this.unitItems
      }
    };
    this.newUnit = {
      unit: {
        name: ''
      } as StockUnitDto,
      options: {
        placeholder: 'Create new unit',
        default: ''
      }
    }
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
