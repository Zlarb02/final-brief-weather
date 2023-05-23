import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest = request;

    if (request.url.includes('search_location_api_endpoint')) {
      modifiedRequest = request.clone({
        url: `${environment.search_location_api_endpoint}${request.url.replace('search_location_api_endpoint', '')}`
      });
    } else if (request.url.includes('current_location_api_endpoint')) {
      modifiedRequest = request.clone({
        url: `${environment.current_location_api_endpoint}${request.url.replace('current_location_api_endpoint', '')}`
      });
    } else if (request.url.includes('weather_api_endpoint')) {
      modifiedRequest = request.clone({
        url: `${environment.weather_api_endpoint}${request.url.replace('weather_api_endpoint', '')}`
      });
    }

    return next.handle(modifiedRequest);
  }
}