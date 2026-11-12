import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-site-header',
  styleUrl: './site-header.css',
  templateUrl: './site-header.html',
})
export class SiteHeader {
  @Input() planetCount = 0;
}
