import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '@app/models';
import { map, Observable, of, switchMap, switchMapTo, takeUntil, tap } from 'rxjs';
import * as fromStory from '@app/store/story';
import { Store } from '@ngrx/store';
import { StoryType } from '@app/services/api/story.service';
import { BaseComponent } from '@app/shared';

@Component({
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends BaseComponent {
  storyType: StoryType;
  stories$: Observable<Story[]>;
  constructor(private route: ActivatedRoute, private store: Store<fromStory.StoryEffects>, private router: Router) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => this.storyType === params.type);

    this.stories$ = this.route.data.pipe(
      takeUntil(this.destroy$),
      map(data => data.stories)
    );
  }
  onSoryClick(id: number) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
