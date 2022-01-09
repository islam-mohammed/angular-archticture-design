import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Story } from '@app/models';
import { Store } from '@ngrx/store';
import * as fromStory from '@app/store/story';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StoryType } from '@app/services/api/story.service';

@Component({
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryDetailsComponent implements OnInit {
  story$: Observable<Story>;
  constructor(private store: Store<fromStory.StoryState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const storyId = +this.route.snapshot.params.id;
    const storyType = this.route.snapshot.params.type;

    if (storyType === StoryType.SCIENCE) {
      this.story$ = this.store.select(fromStory.selectScienceStoryById(storyId));
    } else {
      this.story$ = this.store.select(fromStory.selectWorldStoryById(storyId));
    }
  }
  ngAfterViewChecked() {
    // not the right way to use the window object; just to save time :)
    window.scrollTo(0, 0);
  }
}
