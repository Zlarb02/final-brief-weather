import { Component } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Daily, Weather } from 'src/app/models/weather';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss'],
})
export class AppPageComponent {
  public currentLocation!: Location;
  public chosenLocation!: Location;
  public weather!: Weather;

  public date: Date = new Date();
  public currentHour: string = this.date.getHours().toString().padStart(2, '0');

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

  public winddirection_10m!: number[];

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
          this.winddirection_10m = weather.daily.winddirection_10m_dominant;
          return this.dailyForecast = weather.daily;
        }
      );
  }
}