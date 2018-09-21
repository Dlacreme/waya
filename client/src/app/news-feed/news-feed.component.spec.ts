import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { NewsFeedComponent } from './news-feed.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(inject([TranslateService], (service, es) => {
    translateService = service;
    translateService.use('en');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
