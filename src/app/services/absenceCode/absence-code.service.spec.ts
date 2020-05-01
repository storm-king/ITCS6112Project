import { TestBed } from '@angular/core/testing';

import { AbsenceCodeService } from './absence-code.service';

describe('AbsenceCodeService', () => {
  let service: AbsenceCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
