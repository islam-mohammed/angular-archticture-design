import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ny-search-terms',
  templateUrl: './search-terms.component.html',
  styleUrls: ['./search-terms.component.scss']
})
export class SearchTermsComponent implements OnInit {
  @Input() searchTerms: string[];
  @Output() termClick = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
