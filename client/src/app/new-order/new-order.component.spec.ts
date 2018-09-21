import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewOrderComponent } from './new-order.component';
import { CartComponent } from '../cart/cart.component';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderComponent, CartComponent ],
      imports: [
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([TranslateService], (service, es) => {
    translateService = service;
    translateService.use('en');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
