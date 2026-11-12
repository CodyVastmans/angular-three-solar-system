import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-planet-list',
  styleUrl: './planet-list.css',
  templateUrl: './planet-list.html',
})
export class PlanetList {
  @Input() planets: Planet[] = [];
  @Input() selectedPlanetId: number | null = null;
  @Output() planetSelected = new EventEmitter<Planet>();
  @Output() solarViewSelected = new EventEmitter<void>();
}
