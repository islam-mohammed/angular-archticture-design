import { Component, Input, OnInit } from '@angular/core';
export type ButtonType = 'button' | 'submit';
@Component({
  selector: 'ny-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input() type: ButtonType;

  constructor() {
    this.type = 'button';
  }

  ngOnInit(): void {}
}
