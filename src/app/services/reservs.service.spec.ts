import { TestBed, inject } from '@angular/core/testing';

import { ReservsService } from './reservs.service';

describe('ReservsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservsService]
    });
  });

  it('should be created', inject([ReservsService], (service: ReservsService) => {
    expect(service).toBeTruthy();
  }));
});
