import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ColCard {
  id?: number;
  title?: string;
  section?: string;
  content?: string;
  imageUrl?: string;
  publishedDate?: string;
  abstract?: string;
}

@Component({
  selector: 'ny-col-card',
  templateUrl: './col-card.component.html',
  styleUrls: ['./col-card.component.scss']
})
export class ColCardComponent {
  @Input() colCardData: ColCard;

  @Output() cardClick = new EventEmitter<number>();

  constructor() {}
}
