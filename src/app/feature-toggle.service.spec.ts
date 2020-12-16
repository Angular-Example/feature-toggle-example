import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FeatureToggleService } from './feature-toggle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureToggle } from './feature-toggle';

describe('FeatureToggleService', () => {

  let injector: TestBed;
  let service: FeatureToggleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(FeatureToggleService);
    httpMock = injector.get(HttpTestingController);
  });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

  it('should return an Observable<FeatureToggle[]>', () => {
    const featureTogglesMock: FeatureToggle[] = [
      { active: true, name: 'Dr Nice' },
      { active: false, name: 'Narco' },
      { active: true, name: 'Bombasto' }
    ];

    service.getFeatureToggles().subscribe(featureToggles => {
      expect(featureToggles.length).toBe(3);
      expect(featureToggles).toEqual(featureTogglesMock);
    });

    const req = httpMock.expectOne(`http://localhost:8080/feature/list`);
    expect(req.request.method).toBe("GET");
    req.flush(featureTogglesMock);
  });

  afterEach(() => {
//     httpMock.verify();
  });
});
