import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';
import { CommentResolver } from './comment.resolver';
import { SearhService } from './search.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  declarations: [],
  providers: []
})
export class ApiModule {
  static forRoot() {
    return {
      ngModule: ApiModule,
      providers: [
        AuthService,
        StoryService,
        StoryResolver,
        CommentResolver,
        SearhService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
