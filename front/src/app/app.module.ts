// Librairies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Material
import {
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatTooltipModule,
  MatSidenavModule,
  MatDialogModule,
  MatCardModule
} from '@angular/material';

// Core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { SessionService } from './api/session.service';

// App Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private/private.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockComponent } from './stocks/stock/stock.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ModuleFooterComponent } from './private/module-footer/module-footer.component';
import { ModuleTitleComponent } from './private/module-title/module-title.component';
import { InputComponent } from './form/input/input.component';
import { PickerComponent } from './form/picker/picker.component';
import { SelectComponent } from './form/select/select.component';
import { ValidationDialogComponent } from './form/validation-dialog/validation-dialog.component';
import { StockEditComponent } from './stocks/stock-edit/stock-edit.component';
import { CompoComponent } from './products/compo/compo.component';
import { LoaderComponent } from './app/loader/loader.component';
import { PriceEditComponent } from './products/price-edit/price-edit.component';
import { CompoEditComponent } from './products/compo-edit/compo-edit.component';
import { StockImportComponent } from './stocks/stock-import/stock-import.component';
import { OrderListComponent } from './orders/order-list/order-list.component'
import { ApiInterceptor } from './api-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PrivateComponent,
    OrdersComponent,
    OrderComponent,
    StocksComponent,
    StockComponent,
    ProductsComponent,
    ProductComponent,
    ModuleFooterComponent,
    ModuleTitleComponent,
    InputComponent,
    PickerComponent,
    SelectComponent,
    ValidationDialogComponent,
    StockEditComponent,
    CompoComponent,
    LoaderComponent,
    ProductEditComponent,
    PriceEditComponent,
    CompoEditComponent,
    StockImportComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatRadioModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [
    SessionService,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  entryComponents: [
    ValidationDialogComponent,
    CompoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// OAuth Config
export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [{
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('236169753628462')
    }]
  );
}
