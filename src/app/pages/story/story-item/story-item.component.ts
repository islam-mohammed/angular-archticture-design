import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Story } from '@app/models';
import { ColCard } from '@app/shared';

@Component({
  selector: 'ny-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss']
})
export class StoryItemComponent {
  @Input() story: Story;
  @Output() storyItemSelect = new EventEmitter<number>();

  cardData: ColCard = {};

  constructor() {}

  ngOnInit() {
    this.cardData.id = this.story?.id;
    this.cardData.title = this.story?.title;
    this.cardData.section = this.story?.section;
    this.cardData.imageUrl = this.story?.multimedia?.length ? this.story?.multimedia[0]?.url : '';
    this.cardData.publishedDate = this.story?.published_date;
    this.cardData.abstract = this.story.abstract;
  }
}
