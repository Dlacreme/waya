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
import { StockImportComponent } from './stocks/stock-import/stock-import.component';
import { AdminComponent } from './admin/admin.component';
import { SocialComponent } from './social/social.component';
import { SocialEditComponent } from './social/social-edit/social-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'staff', component: PrivateComponent, children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'stocks', component: StocksComponent },
    { path: 'import', component: StockImportComponent },
    { path: 'product/:id', component: ProductEditComponent },
    { path: 'social', component: SocialComponent },
    { path: 'social/:id', component: SocialEditComponent },
    { path: 'admin', component: AdminComponent },
  ]}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
