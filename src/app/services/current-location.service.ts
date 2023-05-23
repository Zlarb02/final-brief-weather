import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {

  constructor(private http: HttpClient) { }

  getCurrentLocation(lat: number, lon: number) {
    const url = `current_location_api_endpoint?lat=${lat}&lon=${lon}&format=json`;

    return this.http.get(url);
  }
}
