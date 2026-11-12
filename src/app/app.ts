import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { IntroPanel } from './components/intro-panel/intro-panel';
import { PlanetCard } from './components/planet-card/planet-card';
import { PlanetList } from './components/planet-list/planet-list';
import { SiteHeader } from './components/site-header/site-header';
import { SolarCanvas } from './components/solar-canvas/solar-canvas';
import { Planet } from './models/planet.model';
import { PlanetDataService } from './services/planet-data.service';

@Component({
  imports: [IntroPanel, PlanetCard, PlanetList, SiteHeader, SolarCanvas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly planetData = inject(PlanetDataService);
  private readonly sceneError = signal<string | null>(null);

  protected readonly planets = this.planetData.planets;
  protected readonly selectedPlanet = signal<Planet | null>(null);
  protected readonly loadError = computed(() => this.sceneError() ?? this.planetData.error());

  ngOnInit(): void {
    void this.planetData.load();
  }

  protected selectPlanet(planet: Planet | null): void {
    this.selectedPlanet.set(planet);
  }

  protected focusSolarView(): void {
    this.selectedPlanet.set(null);
  }

  protected handleSceneError(message: string): void {
    this.sceneError.set(message);
  }
}
