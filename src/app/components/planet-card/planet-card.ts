import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-planet-card',
  styleUrl: './planet-card.css',
  templateUrl: './planet-card.html',
})
export class PlanetCard {
  @Input() planet: Planet | null = null;
  @Output() closed = new EventEmitter<void>();
}
