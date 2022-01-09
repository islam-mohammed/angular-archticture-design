import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { StoryListModule } from '../story/story-list/story-list.module';
import { SearchTermsComponent } from './search-terms/search-terms.component';
import { PaginatorModule } from '@app/shared';

@NgModule({
  declarations: [SearchComponent, SearchTermsComponent],
  imports: [CommonModule, SearchRoutingModule, StoryListModule, MatInputModule, PaginatorModule],
  exports: [SearchTermsComponent]
})
export class SeachModule {}
