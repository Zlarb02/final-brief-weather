import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';
import { Daily, Weather } from 'src/app/models/weather';
import { Location } from 'src/app/models/location';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime } from 'rxjs';
import { SiblingService } from 'src/app/services/sibling.service';

@Component({
  selector: 'app-seven-days',
  templateUrl: './seven-days.component.html',
  styleUrls: ['./seven-days.component.scss']
})
export class SevenDaysComponent {
  @Input() public currentLocation!: Location;
  @Input() public chosenLocation!: Location;
  @Input() public weather!: Weather;

  @Input() public dailyForecast!: Daily;
  @Input() public dates!: string[];
  @Input() public sevenWeather!: number[];
  @Input() public sevenWeatherDescriptions!: string[];
  @Input() public sevenWeatherIcons!: string[];
  @Input() public sevenWeatherTempMin!: number[];
  @Input() public sevenWeatherTempMax!: number[];
  @Input() public sevenWeatherApparentTempMin!: number[];
  @Input() public sevenWeatherApparentTempMax!: number[];
  @Input() public sevenWeatherPrecipitationProbabilityMean!: number[]

  public chosenPlace: any
  public winddirection_10m!: number[];
  public windspeed_10m!: number[];

  constructor(private weatherService: WeatherService, private router: Router, private searchService: SearchService, private siblingService: SiblingService) { }

  ngOnInit() {
    this.searchService.getPlace().subscribe((osmObj) => {
      this.chosenPlace = osmObj;
      this.getDailyForecast();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
    }
  }
  getDailyForecast() {
    if (this.chosenPlace)
      this.weatherService.getWeatherForecast(this.chosenPlace.lat, this.chosenPlace.lon)
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
            this.windspeed_10m = weather.daily.windspeed_10m_max;
            return this.dailyForecast = weather.daily;
          }
        );
    else if (this.currentLocation)
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
            this.windspeed_10m = weather.daily.windspeed_10m_max;
            return this.dailyForecast = weather.daily;
          }
        );
  }


  formatDate(date: string): string {
    const weekdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const dateObj = new Date(date);
    const dayOfWeek = weekdays[dateObj.getDay()];
    const dayOfMonth = dateObj.getDate();
    const month = months[dateObj.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }


}