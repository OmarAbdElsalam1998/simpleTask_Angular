import { TestBed } from '@angular/core/testing';

import { CustomerTempService } from './customer-temp.service';

describe('CustomerTempService', () => {
  let service: CustomerTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
