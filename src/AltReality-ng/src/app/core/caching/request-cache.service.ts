import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const cacheDuration = 1800000; // 30 minutes

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {

  private cache = new Map();
  
  constructor() { }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = Date.now() > cached.expires;
    if (isExpired) {
      this.cache.delete(url);
      return undefined;
    }

    return cached.response as HttpResponse<any>;
  }

  set(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = request.urlWithParams;
    const entry = { url, response, expires: Date.now() + cacheDuration };
    this.cache.set(url, entry);

    // const expired = Date.now() + cacheDuration;
    // this.cache.forEach(cachedItem => {
    //   if (cachedItem.lastRead < expired) {
    //     this.cache.delete(cachedItem.url);
    //   }
    // });
  }

  remove(key: string): void {
    this.cache.delete(key);
  }
}
