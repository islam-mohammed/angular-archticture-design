import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './story.component';
import { ColCardModule } from '@app/shared/cards/col-card/col-card.module';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { StoryItemModule } from './story-item/story-item.module';
import { StoryListModule } from './story-list/story-list.module';

@NgModule({
  declarations: [StoryComponent, StoryDetailsComponent, CommentListComponent],
  imports: [CommonModule, StoryRoutingModule, ColCardModule, StoryItemModule, StoryListModule],
  exports: [StoryComponent, CommentListComponent]
})
export class StoryModule {}
