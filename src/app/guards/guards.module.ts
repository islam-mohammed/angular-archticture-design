import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UnauthGuard, AuthGuard } from '.';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class GuardsModule {
  static forRoot() {
    return {
      ngModule: GuardsModule,
      providers: [AuthGuard, UnauthGuard],
    };
  }
}
