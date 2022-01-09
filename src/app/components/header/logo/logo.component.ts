import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ny-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() position: 'start' | 'center' | 'end' = 'center';
  @Input() width: string;

  constructor() {}
}
