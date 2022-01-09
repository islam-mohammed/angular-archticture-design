import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ColCardComponent } from './col-card.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [CommonModule, MatCardModule, LazyLoadImageModule],
  declarations: [ColCardComponent],
  exports: [ColCardComponent],
})
export class ColCardModule {}
