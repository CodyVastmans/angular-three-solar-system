import { Component } from '@angular/core';
import { IntroPanel } from './components/intro-panel/intro-panel';
import { PlanetCard } from './components/planet-card/planet-card';
import { PlanetList } from './components/planet-list/planet-list';
import { SiteHeader } from './components/site-header/site-header';
import { SolarCanvas } from './components/solar-canvas/solar-canvas';

@Component({
  imports: [IntroPanel, PlanetCard, PlanetList, SiteHeader, SolarCanvas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
