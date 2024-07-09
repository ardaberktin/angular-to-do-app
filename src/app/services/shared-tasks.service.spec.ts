import { TestBed } from '@angular/core/testing';

import { SharedTasksService } from './shared-tasks.service';

describe('SharedTasksService', () => {
  let service: SharedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
