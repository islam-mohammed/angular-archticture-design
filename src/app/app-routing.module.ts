import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from '@app/guards';
import { HomeComponent } from '@app/pages/home/home.component';
import { StoryResolver } from '@app/services/api/story.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('@app/pages/login/login.module').then(m => m.LoginModule),
    canLoad: [UnauthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('@app/pages/registration/registration.module').then(m => m.RegistrationModule),
    canLoad: [UnauthGuard]
  },
  {
    path: 'story/:type',
    loadChildren: () => import('@app/pages/story/story.module').then(m => m.StoryModule),
    canLoad: [AuthGuard],
    resolve: {
      stories: StoryResolver
    }
  },
  {
    path: 'search',
    loadChildren: () => import('@app/pages/search/search.module').then(m => m.SeachModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./pages/static/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
