import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoryItemModule } from '../story-item/story-item.module';

import { StoryListComponent } from './story-list.component';

@NgModule({
  imports: [CommonModule, StoryItemModule],
  exports: [StoryListComponent],
  declarations: [StoryListComponent],
  providers: []
})
export class StoryListModule {}
