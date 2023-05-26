import { Component } from '@angular/core';
import { Daily, Hourly } from 'src/app/models/weather';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent {
  public currentLocation: any | undefined;
  public chosenLocation: any | undefined;
  public weather: any | undefined;

  public date = new Date();
  public currentHour = this.date.getHours().toString().padStart(2, '0');

  public dailyForecast!: Daily;
  public dates!: string[];
  public sevenWeather!: number[];
  public sevenWeatherDescriptions!: string[];
  public sevenWeatherIcons!: string[];
  public sevenWeatherTempMin!: number[];
  public sevenWeatherTempMax!: number[];
  public sevenWeatherApparentTempMin!: number[];
  public sevenWeatherApparentTempMax!: number[];
  public sevenWeatherPrecipitationProbabilityMean!: number[]

  public hourlyForecast!: Hourly;
  public hours!: string[];
  public hourlyWeather!: number[];
  public hourlyWeatherDescriptions!: string[];
  public hourlyWeatherIcons!: string[];
  public hourlyWeatherTemp!: number[];
  public hourlyWeatherApparentTemp!: number[];
  public hourlyWeatherPrecipitationProbability!: number[]

  private currentDay!: string;
  public dayIndex!: number;

  constructor(private currentLocationService: CurrentLocationService, private weatherService: WeatherService) {
    const url = window.location.pathname;
    this.currentDay = url.charAt(url.length - 1);
    if (this.currentDay === 'e') {
      this.dayIndex = 0
    } else
      this.dayIndex = Number(this.currentDay) - 1;
  }

  ngOnInit() {
    this.currentLocationService.getCurrentLocationFromBrowser().subscribe(
      (location) => {
        this.currentLocation = location;
        console.log(this.currentLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDailyForecast() {
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          this.dates = weather.daily.time;
          this.sevenWeatherTempMin = weather.daily.temperature_2m_min;
          this.sevenWeatherTempMax = weather.daily.temperature_2m_max;
          this.sevenWeatherApparentTempMin = weather.daily.apparent_temperature_min;
          this.sevenWeatherApparentTempMax = weather.daily.apparent_temperature_max;
          this.sevenWeatherPrecipitationProbabilityMean = weather.daily.precipitation_probability_mean;
          this.sevenWeatherDescriptions = weather.daily.weathercode.map(code => this.weatherService.getWeatherDescription(code));
          this.sevenWeatherIcons = weather.daily.weathercode.map(code => this.weatherService.getWeatherIcon(code));
          return this.dailyForecast = weather.daily;
        }
      );
  }

  getHourlyForecast(dayIndex: number) {
    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          this.hourlyForecast = weather.hourly;
          this.hours = weather.hourly.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
          this.hourlyWeatherTemp = weather.hourly.temperature_2m.slice(startIndex, endIndex);
          this.hourlyWeatherApparentTemp = weather.hourly.apparent_temperature.slice(startIndex, endIndex);
          this.hourlyWeatherPrecipitationProbability = weather.hourly.precipitation_probability.slice(startIndex, endIndex);
          this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
          this.hourlyWeatherIcons = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
        }
      );
  }
}