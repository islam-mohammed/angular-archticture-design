import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Story } from '@app/models';
import { SearhService } from '@app/services/api';
import { BaseComponent } from '@app/shared';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'ny-search',
  templateUrl: './search.component.html'
})
export class SearchComponent extends BaseComponent implements OnInit {
  stories$: Observable<Story[]>;
  searchTermsArray: string[] = [];
  searchMeta: any;

  @ViewChild('q', { static: true }) searchElRef: ElementRef;

  constructor(private route: ActivatedRoute, private searchService: SearhService, private renderer: Renderer2) {
    super();
    this.loadSearchTerms();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(param => {
      this.renderer.setAttribute(this.searchElRef.nativeElement, 'value', param.q);
      this.applySearch(param.q);
    });
  }

  onTermClick(q: string) {
    this.renderer.setAttribute(this.searchElRef.nativeElement, 'value', q);
    this.applySearch(q);
  }
  applySearch(q: string, page = 0) {
    this.stories$ = this.searchService.getSearchResults(q, page).pipe(
      map((results: any) => {
        if (results) {
          this.searchMeta = results?.meta;
          return results.docs;
        }
        return [];
      })
    );
    this.saveSearchTerm(q);
  }

  onSoryClick(storyId: number) {}

  loadSearchTerms() {
    const searchTerms = localStorage.getItem('search');
    if (searchTerms) this.searchTermsArray = searchTerms.split(',');
  }

  saveSearchTerm(term: string) {
    if (!this.searchTermsArray.includes(term)) {
      if (this.searchTermsArray.length < 5) {
        this.searchTermsArray.unshift(term);
        localStorage.setItem('search', this.searchTermsArray.join(','));
      } else {
        this.searchTermsArray.pop();
        this.searchTermsArray.unshift(term);
        localStorage.setItem('search', this.searchTermsArray.join(','));
      }
    }
  }
}
