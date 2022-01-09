import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { NavComponent } from './components/header/nav/nav.component';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';
import { ApiModule, NotificationModule } from './services';
import { HomeComponent } from './pages/home/home.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { GuardsModule } from './guards/guards.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LogoComponent, NavComponent, HomeComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    NotificationModule.forRoot(),
    ApiModule.forRoot(),
    GuardsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
