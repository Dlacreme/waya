import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private/private.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'staff', component: PrivateComponent, children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'stocks', component: StocksComponent },
    { path: 'product/:id', component: ProductEditComponent }
  ]}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
