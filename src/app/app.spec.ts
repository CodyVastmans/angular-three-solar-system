import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SolarCanvas } from './components/solar-canvas/solar-canvas';
import { Planet } from './models/planet.model';
import { PlanetDataService } from './services/planet-data.service';

@Component({
  selector: 'app-solar-canvas',
  standalone: true,
  template: '<canvas class="solar-canvas"></canvas>',
})
class SolarCanvasStub {
  @Input() planets: Planet[] = [];
  @Output() planetSelected = new EventEmitter<Planet | null>();
  @Output() sceneError = new EventEmitter<string>();
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{
        provide: PlanetDataService,
        useValue: { planets: signal([]), error: signal(null), load: () => Promise.resolve() },
      }],
    })
      .overrideComponent(App, {
        remove: { imports: [SolarCanvas] },
        add: { imports: [SolarCanvasStub] },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the workshop canvas and heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('canvas.solar-canvas')).toBeTruthy();
    expect(compiled.querySelector('h1')?.textContent).toContain('Our solar');
  });
});
