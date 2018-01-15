import { TestBed, inject } from '@angular/core/testing';

import { JsLoaderService } from './js-loader.service';

describe('JsLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsLoaderService]
    });
  });

  it('should be created', inject([JsLoaderService], (service: JsLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
