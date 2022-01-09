import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentResolver } from '@app/services/api/comment.resolver';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { StoryComponent } from './story.component';

const routes: Routes = [
  {
    path: '',
    component: StoryComponent
  },
  {
    path: ':id',
    component: StoryDetailsComponent
    // resolve: {
    //   comments: CommentResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {}
