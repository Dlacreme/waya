// Librairies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';

// Core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { SessionService } from './api/session.service';

// Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

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
  MatMenuModule,
  MatTooltipModule,
  MatSidenavModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private/private.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,

    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatRadioModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  providers: [
    SessionService,
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
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
