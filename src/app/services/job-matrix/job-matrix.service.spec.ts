import { TestBed } from '@angular/core/testing';

import { JobMatrixService } from './job-matrix.service';

describe('JobMatrixService', () => {
  let service: JobMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
