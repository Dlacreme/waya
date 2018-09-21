import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from '../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService, OrderDto, PaymentMethod } from '../services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

interface CreateDone {
  created:boolean;
  products:boolean;
  table:boolean;
  payment:boolean;
}

enum Payment {
  OnDelivery,
  Credit
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public form:FormGroup;
  public products:Product[] = this.dataService.getCart();
  public editable = false;
  public secondStep = false;
  public paymentMethod = Payment;
  public hasEnoughCredit = false;
  public loading = false;
  public tables = this.dataService.getTables();

  private createOrderSub = Subscription.EMPTY;
  private productsOrderSub = Subscription.EMPTY;
  private paymentOrderSub = Subscription.EMPTY;
  private tableOrderSub = Subscription.EMPTY;

  constructor(
    private router:Router,
    private dataService:DataService,
    private orderService:OrderService
  ) { }

  public ngOnInit():void {
    this.form = new FormGroup({
      table: new FormControl(
        '',
        [Validators.required]
      ),
      paymentMethod: new FormControl(
        Payment.OnDelivery,
        [Validators.required]
      ),
      comment: new FormControl(
        ''
      )
    });
  }

  public ngOnDestroy():void {
    this.createOrderSub.unsubscribe();
    this.productsOrderSub.unsubscribe();
    this.paymentOrderSub.unsubscribe();
    this.tableOrderSub.unsubscribe();
  }

  public removeItem(product:Product):void {
    this.dataService.removeFromCart(product.id);
  }

  public isEditable(editable:boolean):void {
    this.editable = editable;
  }

  public stepTwo(state:boolean):void {
    this.isEditable(false);
    this.secondStep = state;
  }

  public confirm():void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const isDone:CreateDone = {
      created: false,
      products: false,
      table: false,
      payment: this.form.controls.paymentMethod.value === Payment.Credit ? false : true
    };
    const userComment = this.form.controls.comment.value;
    this.createOrderSub = this.orderService.create(
      userComment ? userComment : 'Generated from client app')
      .subscribe((res) => {
        isDone.created = true;
        this.updateTable(res.data as OrderDto, isDone);
        this.updateProducts(res.data as OrderDto, isDone);
        if (!isDone.payment) {
          this.makePayment(res.data as OrderDto, isDone);
        }
      });
  }

  private updateTable(order:OrderDto, isDone:CreateDone):void {
    this.tableOrderSub = this.orderService.updateTable(order, this.form.controls.table.value)
      .subscribe((res) => {
        isDone.table = true;
        this.redirectIfDone(isDone);
      });
  }

  private updateProducts(order:OrderDto, isDone:CreateDone):void {
    this.productsOrderSub = this.orderService.updateProducts(
      order,
      this.products.map((item) => item.id),
      []
    ).subscribe((res) => {
      isDone.products = true;
      this.redirectIfDone(isDone);
    });
  }

  private makePayment(order:OrderDto, isDone:CreateDone):void {
    this.paymentOrderSub = this.orderService.payment(order.id, PaymentMethod.Credit)
      .subscribe((res) => {
        isDone.payment = true;
        this.redirectIfDone(isDone);
      })
  }

  private redirectIfDone(createDone:CreateDone):void {
    if (createDone.created && createDone.products && createDone.table && createDone.payment) {
      this.loading = false;
      this.router.navigate(['/my-yana/news/order_confirmed']);
    }
  }

}
