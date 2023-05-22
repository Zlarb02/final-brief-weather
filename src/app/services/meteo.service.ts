import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfosMeteo } from '../models/infos.model';
import { City } from '../models/City.model';

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  constructor(private http: HttpClient) {}

  getData(longitude: number, latitude: number): Observable<InfosMeteo> {
    return this.http.get<InfosMeteo>(
      'https://api.open-meteo.com/v1/forecast?latitude=' +
        latitude +
        '&longitude=' +
        longitude +
        '&timezone=auto&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m,weathercode,visibility,is_day&current_weather=true'
    );
  }

  getLatAndLonFromCityName(city: string): Observable<City[]> {
    // https://nominatim.openstreetmap.org/search.php?q=paris&format=jsonv2
    return this.http.get<City[]>(
      'https://nominatim.openstreetmap.org/search.php?q='+city+'&format=jsonv2'
    );

  }
}
