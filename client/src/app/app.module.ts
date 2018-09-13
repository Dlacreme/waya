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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionService } from './services/session.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

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
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
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
