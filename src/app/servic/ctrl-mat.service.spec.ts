import { TestBed } from '@angular/core/testing';

import { ControlMateriaService } from './ctrl-mat.service';

describe('ControlMateriaService', () => {
  let service: ControlMateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlMateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
