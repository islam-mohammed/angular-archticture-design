import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Story } from '@app/models';

@Component({
  selector: 'ny-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent {
  @Input() stories: Story[];
  @Output() storySelect = new EventEmitter<number>();
  constructor() {}

  trackByFn(index: number, story: Story) {
    return story.id;
  }
}
