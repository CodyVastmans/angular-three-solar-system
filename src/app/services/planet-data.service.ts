import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Planet } from '../models/planet.model';

@Injectable({ providedIn: 'root' })
export class PlanetDataService {
  readonly planets = signal<Planet[]>([]);
  readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const planets = await firstValueFrom(this.http.get<Planet[]>('/planets.json'));
      if (!Array.isArray(planets) || planets.length === 0) {
        throw new Error('planets.json must contain a non-empty array of planets');
      }

      this.planets.set(planets);
    } catch (error) {
      console.error('Unable to load the planet data.', error);
      this.error.set('Planets could not be loaded. Check that planets.json is available in the project root.');
    }
  }
}
