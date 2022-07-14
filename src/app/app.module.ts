import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AuthHttpInterceptor } from './services/auth-http.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthenticationModule } from './authentication/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    // AuthenticationModule
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    // AuthenticationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
