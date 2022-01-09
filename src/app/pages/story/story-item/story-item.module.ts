import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColCardModule } from '@app/shared/cards/col-card/col-card.module';

import { StoryItemComponent } from './story-item.component';

@NgModule({
  imports: [CommonModule, ColCardModule],
  exports: [StoryItemComponent],
  declarations: [StoryItemComponent],
  providers: []
})
export class StoryItemModule {}
