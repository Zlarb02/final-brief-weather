import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {

  constructor(private http: HttpClient) { }

  getCurrentLocation(lat: number, lon: number) {
    const url = `current_location_api_endpoint/reverse?lat=${lat}&lon=${lon}`;

    return this.http.get(url);
  }
}
