import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColCardModule } from './col-card/col-card.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ColCardModule],
  exports: [ColCardModule],
})
export class CardsModule {}
