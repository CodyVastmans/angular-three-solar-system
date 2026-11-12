import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-solar-canvas',
  styleUrl: './solar-canvas.css',
  templateUrl: './solar-canvas.html',
})
export class SolarCanvas implements AfterViewInit {
  @Input() planets: Planet[] = [];
  @Output() planetSelected = new EventEmitter<Planet | null>();
  @Output() sceneError = new EventEmitter<string>();

  @ViewChild('planetCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    this.camera.position.z = 12;

    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch (error) {
      console.error('Unable to initialize the planet scene.', error);
      this.sceneError.emit('The 3D scene could not be started. Please check that WebGL is available.');
      return;
    }

    this.renderer.setSize(width, height, false);
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.renderer) return;

    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.renderer.render(this.scene, this.camera);
  }
}
