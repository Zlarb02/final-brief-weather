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
    const url = `weather_api_endpoint?latitude=${latitude}&longitude=${longitude}&elevation=44.812&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,shortwave_radiation,direct_radiation,direct_normal_irradiance,diffuse_radiation,vapor_pressure_deficit,cape,evapotranspiration,et0_fao_evapotranspiration,precipitation,snowfall,precipitation_probability,rain,showers,weathercode,snow_depth,freezinglevel_height,visibility,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm,is_day&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,precipitation_probability_min,precipitation_probability_mean,weathercode,sunrise,sunset,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration,uv_index_max,uv_index_clear_sky_max&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&timezone=auto&forecast_days=7`;

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

  private weatherIcons: { [key: number]: string } = {
    0: 'clear_sky.png',
    1: 'light_clouds.png',
    2: 'partly_cloudy.png',
    3: 'cloudy.png',
    45: 'light_fog.png',
    48: 'dense_fog.png',
    51: 'drizzle.png',
    53: 'drizzle.png',
    55: 'drizzle.png',
    56: 'rain_snow.png',
    57: 'rain_snow.png',
    61: 'rain.png',
    63: 'rain.png',
    65: 'rain.png',
    66: 'freezing_rain.png',
    67: 'freezing_rain.png',
    71: 'snow.png',
    73: 'snow.png',
    75: 'snow.png',
    77: 'snow.png',
    80: 'rain_shower.png',
    81: 'rain_shower.png',
    82: 'rain_shower.png',
    85: 'snow_shower.png',
    86: 'snow_shower.png',
    95: 'thunderstorms.png',
    96: 'thunderstorms.png',
    99: 'thunderstorms.png',
  };

  getWeatherIcon(code: number): string {
    return this.weatherIcons[code] || '';
  }

}
