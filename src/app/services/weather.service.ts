import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(latitude: number, longitude: number): Observable<Weather> {
    const url = `weather_api_endpoint?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max,weathercode&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m,weathercode,visibility,is_day&current_weather=true`
    return this.http.get<Weather>(url);
  }

  private weatherDescriptions: { [key: number]: string } = {
    0: 'Ciel dégagé',
    1: 'Principalement dégagé',
    2: 'Partiellement nuageux',
    3: 'Couvert',
    45: 'Brouillard et givre',
    48: 'Brouillard et givre',
    51: 'Bruine légère',
    53: 'Bruine modérée',
    55: 'Bruine dense',
    56: 'Bruine verglaçante légère',
    57: 'Bruine verglaçante dense',
    61: 'Pluie légère',
    63: 'Pluie modérée',
    65: 'Pluie forte',
    66: 'Pluie verglaçante légère',
    67: 'Pluie verglaçante forte',
    71: 'Chute de neige légère',
    73: 'Chute de neige modérée',
    75: 'Chute de neige forte',
    77: 'Grains de neige',
    80: 'Averses de pluie légères',
    81: 'Averses de pluie modérées',
    82: 'Averses de pluie violentes',
    85: 'Averses de neige légères',
    86: 'Averses de neige fortes',
    95: 'Orage faible ou modéré',
    96: 'Orage avec grêle légère',
    99: 'Orage avec grêle forte'
  };

  getWeatherDescription(code: number): string {
    return this.weatherDescriptions[code] || '';
  }
}
