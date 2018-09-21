import { TestBed, inject } from '@angular/core/testing';

import { SocialService } from './social.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SocialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocialService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([SocialService], (service: SocialService) => {
    expect(service).toBeTruthy();
  }));
});
