import { NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';
@NgModule({
  imports: [MatSnackBarModule],
  exports: [],
  declarations: [
    NotificationComponent
  ],
  providers: [],
})
export class NotificationModule {
  static forRoot() {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService],
    };
  }
}
