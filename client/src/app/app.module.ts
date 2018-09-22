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
  MatCardModule,
  MatTabsModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

// Core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { SessionService } from './services/session.service';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './news-feed/preview/preview.component';
import { ReaderComponent } from './reader/reader.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { DataService } from './services/data.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ApiInterceptor } from './api-interceptor';
import { ProfileComponent } from './profile/profile.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    NewsFeedComponent,
    NotFoundComponent,
    PreviewComponent,
    ReaderComponent,
    NewOrderComponent,
    CartComponent,
    ProductItemComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

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
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule
  ],
  providers: [
    SessionService,
    DataService,
    ProductService,
    OrderService,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  entryComponents: [
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
