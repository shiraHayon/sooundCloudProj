import { TestBed, inject } from '@angular/core/testing';

import { SoundCloudService } from './sound-cloud.service';

describe('SoundCloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundCloudService]
    });
  });

  it('should be created', inject([SoundCloudService], (service: SoundCloudService) => {
    expect(service).toBeTruthy();
  }));
});
