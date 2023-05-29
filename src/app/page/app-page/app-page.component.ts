import { Component } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Daily, Weather } from 'src/app/models/weather';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { SearchService } from 'src/app/services/search.service';
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
  public currentHour: number = Number(this.date.getHours().toString().padStart(2, '0'));

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
  public windspeed_10m!: number[];

  public dayIndex!: number;
  public hourIndex!: number;


  private chosenPlace: any;

  constructor(private currentLocationService: CurrentLocationService, private weatherService: WeatherService, private searchService: SearchService) {
    const url = window.location.pathname;
    const segments = url.split('/');
    if (segments.length === 4) {
      this.hourIndex = Number(segments[segments.length - 1]);
      this.dayIndex = Number(segments[segments.length - 2]) - 1;
    } else if (segments.length === 3) {
      this.dayIndex = Number(segments[segments.length - 1]) - 1;
      this.hourIndex = Number(this.currentHour);
    }
  }

  ngOnInit() {
    this.currentLocationService.getCurrentLocationFromBrowser().subscribe(
      (location) => {
        this.currentLocation = location;
      }
    );
  }


}