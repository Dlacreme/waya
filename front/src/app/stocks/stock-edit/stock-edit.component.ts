import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { StockDto, StockService, StockFormatDto, StockTypeDto } from '../../api/stock.service';
import { ValidationDialogComponent } from '../../form/validation-dialog/validation-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SelectOptions, SelectItem } from '../../form/select/select.component';
import { ApiItem } from '../../api/api';
import { InputOptions, InputType } from '../../form/input/input.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  public data:StockDto;

  public nameOptions:InputOptions = {} as InputOptions;
  public descOptions:InputOptions = {} as InputOptions;
  public balanceOptions:InputOptions = {} as InputOptions;
  public sizeOptions:InputOptions = {} as InputOptions;
  public formatOptions:SelectOptions = {} as SelectOptions;
  public typeOptions:SelectOptions = {} as SelectOptions;

  public formats:StockFormatDto[] = [];
  public types:StockTypeDto[] = [];


  private dialogSub:Subscription = Subscription.EMPTY;
  private updateSub:Subscription = Subscription.EMPTY;
  private deleteSub:Subscription = Subscription.EMPTY;
  private formatsSub:Subscription = Subscription.EMPTY;
  private typesSub:Subscription = Subscription.EMPTY;

  constructor(
    public stockService:StockService,
    public dialog:MatDialog,
    public matSnackbar:MatSnackBar,
    private router:Router
  ) { }

  @Input()
  set stock(stock:StockDto) {
    this.data = JSON.parse(JSON.stringify(stock));
  }

  @Output() afterupdate = new EventEmitter();

  public ngOnInit():void {
    this.initNameOptions();
    this.initDescOptions();
    this.initBalanceOptions();
    this.initSizeOptions();
    this.initFormatOptions();
    this.initTypeOptions();
  }

  public ngOnDestroy():void {
    this.dialogSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.formatsSub.unsubscribe();
    this.typesSub.unsubscribe();
    this.deleteSub.unsubscribe();
  }

  public openDeleteValidation():void {
    const dialog = this.dialog.open(ValidationDialogComponent, {
      data: `Do you want to delete ${this.data.name}?`
    });
    this.dialogSub = dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSub = this.stockService.delete(this.data.id)
          .subscribe(() => {
            this.matSnackbar.open(`${this.data.name} deleted. Redirected...`, 'clock', {duration: 5000})
            this.router.navigate(['staff/stocks']);
          });
      }
    });
  }

  private initNameOptions():void {
    this.nameOptions = {
      placeholder: 'Name',
      default: this.data.name
    }
  }

  private initDescOptions():void {
    this.descOptions = {
      placeholder: "Description",
      default: this.data.desc,
      type: InputType.Textarea
    };
  }

  private initBalanceOptions():void {
    this.balanceOptions = {
      label: "Balance",
      placeholder: "Balance",
      default: this.data.balance,
      type: InputType.Number
    };
  }

  private initSizeOptions():void {
    this.sizeOptions = {
      label: "Size",
      placeholder: "Size",
      default: this.data.size,
      type: InputType.Number
    };
  }

  private initFormatOptions():void {
    this.formatOptions = {
      label: 'Format',
      placeholder: 'Format',
      default: this.data.stock_format.id,
      items: []
    };

    this.formatsSub = this.stockService.getFormats()
      .subscribe((res) => {
        if (res.data) {
          this.formats = res.data;
        }
        this.insertItems(this.formatOptions.items, res.data as ApiItem[]);
      });
  }

  private initTypeOptions():void {
    this.typeOptions = {
      label: 'Type',
      placeholder: 'Type',
      default: this.data.stock_type.id,
      items: []
    };

    this.typesSub = this.stockService.getTypes()
    .subscribe((res) => {
      if (res.data) {
        this.types = res.data;
      }
      this.insertItems(this.typeOptions.items, res.data as ApiItem[]);
    });
  }

  private insertItems<T, V>(array:SelectItem[], apiData:ApiItem[]):void {
    if (!apiData) {
      return;
    }
    apiData.forEach((item) => {
      array.push({
        value: item.id,
        text: item.name
      });
    });
  }

  public updateName(name:string):void {
    this.data.name = name;
  }

  public updateDesc(desc:string):void {
    this.data.desc = desc;
  }

  public updateBalance(balance:number):void {
    this.data.balance = balance;
  }

  public updateSize(size:number):void {
    this.data.size = size;
  }

  public updateFormat(format:SelectItem):void {
    this.data.stock_format_id = format.value;
    const stockFormat = this.formats.find((item) => item.id === format.value);
    if (stockFormat) {
      this.data.stock_format = stockFormat;
    }
  }

  public updateType(type:SelectItem):void {
    this.data.stock_type_id = type.value;
    const stockType = this.types.find((item) => item.id === type.value);
    if (stockType) {
      this.data.stock_type = stockType;
    }
  }

  public update():void {
    window.setTimeout(() => {
      this.updateSub = this.stockService
        .update(this.data)
        .subscribe((res) => {
          this.afterupdate.emit(res.data);
        });
    });
  }

}
