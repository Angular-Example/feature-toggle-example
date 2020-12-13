import { Component } from '@angular/core';
import { FeatureToggle } from './feature-toggle';
import { FeatureToggleService } from './feature-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feature Toggle Example';
  featureToggles: FeatureToggle[];

  constructor(private featureToggleService: FeatureToggleService) { }

  ngOnInit(): void {
    this.getFeatureToggles();
  }

  getFeatureToggles(): void {
    this.featureToggleService.getFeatureToggles()
        .subscribe(featureToggles => {
          this.featureToggles = featureToggles;
          console.log(featureToggles);
        });
  }

  toggleFeature(name: string): void {
    this.featureToggleService.toggleFeature(name)
        .subscribe(_ => this.getFeatureToggles());
  }
}
