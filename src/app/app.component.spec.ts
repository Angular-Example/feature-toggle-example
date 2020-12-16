import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FeatureToggle } from './feature-toggle';
import { FeatureToggleService } from './feature-toggle.service';
import { Observable, of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    const featureTogglesMock: FeatureToggle[] = [
      { active: true, name: 'Dr Nice' },
      { active: false, name: 'Narco' },
      { active: true, name: 'Bombasto' }
    ];

    // Create a fake TwainService object with a `getQuote()` spy
    const featureToggleService = jasmine.createSpyObj('FeatureToggleService', ['getFeatureToggles']);
    // Make the spy return a synchronous Observable with the test data
    const getFeatureTogglesSpy = featureToggleService.getFeatureToggles.and.returnValue(of(featureTogglesMock));

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true },
          { provide: FeatureToggleService, useValue: featureToggleService }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Feature Toggle Example'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Feature Toggle Example');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(app.title);
  });
});
