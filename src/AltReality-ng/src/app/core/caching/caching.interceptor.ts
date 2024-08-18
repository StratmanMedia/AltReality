import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from './request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCacheService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') return this.sendRequest(request, next);
    
    const cachedResponse = this.cache.get(request);
    return cachedResponse
      ? new Observable(o => o.next(cachedResponse))
      : this.sendRequest(request, next);
  }

  private sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
          this.cache.set(request, event);
        }
      })
    );
  }
}
