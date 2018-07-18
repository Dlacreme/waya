import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StockService } from './stock.service';

describe('StockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [StockService]
    });
  });

  it('should be created', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));
});
