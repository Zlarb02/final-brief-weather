import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getData(longitude: number, latitude: number): Observable<Weather> {
    return this.http.get<Weather>(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        latitude +
        '&longitude=' +
        longitude +
        '&timezone=auto&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m,weathercode,visibility,is_day&current_weather=true'
    );
  }
}
