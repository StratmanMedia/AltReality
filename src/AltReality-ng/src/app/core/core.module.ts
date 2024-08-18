import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AltRealityApiService } from './alt-reality-api/alt-reality-api.service';
import { RequestCacheService } from './caching/request-cache.service';
import { CachingInterceptor } from './caching/caching.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RequestCacheService,
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
    AuthService,
    AltRealityApiService
  ]
})
export class CoreModule { }
