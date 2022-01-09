import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ny-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() set paginationMetaData(value: any) {
    this.initPaginator(value);
  }

  @Input() maxNumberOfPages: number;
  @Input() pageSize = 10;
  @Output() changePage = new EventEmitter<number>();

  offset: number;
  length: number;
  pageNumber: number;
  totalNumberOfPages: number;
  constructor() {}

  ngOnInit(): void {}
  handle(e) {}
  initPaginator(meta: any) {
    this.length = meta.hits / 10 <= this.maxNumberOfPages ? Math.floor(meta.hits / 10) : this.maxNumberOfPages;
    this.pageNumber = meta?.offset / this.pageSize;
  }
}
