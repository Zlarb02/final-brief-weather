import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class ChosenLocationService {
  constructor(private http: HttpClient) { }

  getLatAndLonFromSearch(q: string): Observable<Location[]> {
    const url = `search_location_api_endpoint.php?q=${q}&format=jsonv2`;
    const latAndLon = this.http.get<Location[]>(url);
    return new Observable((observer) => {
      latAndLon.subscribe(
        (location) => {
          observer.next(location);
          observer.complete();
        });
    });

    return latAndLon;
  }
} 