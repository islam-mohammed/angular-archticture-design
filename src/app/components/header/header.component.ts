import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ny-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isAuthorized: boolean;
  @Output() logOut = new EventEmitter<void>();
  constructor() {}

  onLogout(): void {
    this.logOut.emit();
  }
}
