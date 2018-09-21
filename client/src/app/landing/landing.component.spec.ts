import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'angularx-social-login';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        NewsFeedComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        AuthService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(inject([TranslateService], (service, es) => {
    translateService = service;
    translateService.use('en');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
