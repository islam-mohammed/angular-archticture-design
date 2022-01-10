import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ny-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() isAuthorized: boolean;
  @Output() logOut = new EventEmitter<void>();
  showMobileMenu = false;
  constructor(private router: Router) {}
  search(q: string) {
    this.router.navigate(['/search'], { queryParams: { q } });
  }
}
