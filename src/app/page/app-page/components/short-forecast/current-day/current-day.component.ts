import { Component, Input, SimpleChanges } from '@angular/core';
import { Location } from 'src/app/models/location';
import { Daily, Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
import { SiblingService } from 'src/app/services/sibling.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
})
export class CurrentDayComponent {
  @Input() public currentLocation!: Location;
  @Input() public chosenLocation!: Location;
  @Input() public weather!: Weather;

  @Input() public getDailyForecast!: () => void;
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

  @Input() public winddirection_10m!: number[];
  @Input() public windspeed_10m!: number[];

  public hourlyForecast!: Hourly;
  public hours!: string[];
  public hourlyWeather!: number[];
  public hourlyWeatherDescriptions!: string[];
  public hourlyWeatherIcons!: string[];
  public hourlyWeatherTemp!: number[];
  public hourlyWeatherApparentTemp!: number[];
  public hourlyWeatherPrecipitationProbability!: number[]
  public hourlyWeatherHumidity!: number[]

  public currentHourForecast!: { hour: string; temperature: number; apparentTemperature: number; precipitationProbability: number; humidity: number; description: string; icon: string; } | null;

  public date: Date = new Date();
  public currentHour: number = Number(this.date.getHours().toString().padStart(2, '0'));

  public dayIndex!: number;
  public hourIndex!: number;

  public chosenPlace: any;

  constructor(private weatherService: WeatherService, private searchService: SearchService, private siblingService: SiblingService) {
    this.setIndexs()
  }

  setIndexs() {
    const url = window.location.pathname;
    const segments = url.split('/');
    if (segments.length === 4) {
      this.hourIndex = Number(segments[segments.length - 1]);
      this.dayIndex = Number(segments[segments.length - 2]) - 1;
    } else if (segments.length === 3) {
      this.dayIndex = Number(segments[segments.length - 1]) - 1;
      this.hourIndex = this.currentHour;
    }
  }

  ngOnInit() {
    this.searchService.getPlace().subscribe((osmObj) => {
      this.chosenPlace = osmObj;
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
    });
    this.siblingService.getRefreshObservable().subscribe(() => {
      this.setIndexs()
      this.getHourlyForecast(this.dayIndex)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
    }
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

  getHourlyForecast(dayIndex: number) {
    const startIndex = dayIndex * 24;
    const endIndex = startIndex + 24;
    if (this.chosenPlace)
      this.weatherService.getWeatherForecast(this.chosenPlace.lat, this.chosenPlace.lon)
        .subscribe(
          (weather) => {
            this.hourlyForecast = weather.hourly;
            this.hours = weather.hourly.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
            this.hourlyWeatherTemp = weather.hourly.temperature_2m.slice(startIndex, endIndex);
            this.hourlyWeatherApparentTemp = weather.hourly.apparent_temperature.slice(startIndex, endIndex);
            this.hourlyWeatherPrecipitationProbability = weather.hourly.precipitation_probability.slice(startIndex, endIndex);
            this.hourlyWeatherHumidity = weather.hourly.relativehumidity_2m.slice(startIndex, endIndex);
            this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIcons = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            this.currentHourForecast = this.getCurrentHourForecast();
            this.currentHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
    else if (this.currentLocation)
      this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
        .subscribe(
          (weather) => {
            this.hourlyForecast = weather.hourly;
            this.hours = weather.hourly.time.slice(startIndex, endIndex).map(date => date.split('T')[1]);
            this.hourlyWeatherTemp = weather.hourly.temperature_2m.slice(startIndex, endIndex);
            this.hourlyWeatherApparentTemp = weather.hourly.apparent_temperature.slice(startIndex, endIndex);
            this.hourlyWeatherPrecipitationProbability = weather.hourly.precipitation_probability.slice(startIndex, endIndex);
            this.hourlyWeatherHumidity = weather.hourly.relativehumidity_2m.slice(startIndex, endIndex);
            this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIcons = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            this.currentHourForecast = this.getCurrentHourForecast();
            this.currentHourForecast = this.getSelectedHourForecast(this.hourIndex);
          }
        );
  }


  getCurrentHourForecast() {
    let currentHourIndex = -1
    if (this.currentLocation)
      currentHourIndex = this.hours.findIndex(hour => hour === `${this.currentHour}:00`);
    if (currentHourIndex !== -1) {
      const currentHourForecast = {
        hour: this.hours[currentHourIndex],
        temperature: this.hourlyWeatherTemp[currentHourIndex],
        apparentTemperature: this.hourlyWeatherApparentTemp[currentHourIndex],
        precipitationProbability: this.hourlyWeatherPrecipitationProbability[currentHourIndex],
        humidity: this.hourlyWeatherHumidity[currentHourIndex],
        description: this.hourlyWeatherDescriptions[currentHourIndex],
        icon: this.hourlyWeatherIcons[currentHourIndex]
      };
      return currentHourForecast;
    } else {
      return null;
    }
  }

  getSelectedHourForecast(i: number) {
    const currentHourForecast = {
      hour: this.hours[i],
      temperature: this.hourlyWeatherTemp[i],
      apparentTemperature: this.hourlyWeatherApparentTemp[i],
      precipitationProbability: this.hourlyWeatherPrecipitationProbability[i],
      humidity: this.hourlyWeatherHumidity[i],
      description: this.hourlyWeatherDescriptions[i],
      icon: this.hourlyWeatherIcons[i]
    };
    return currentHourForecast;
  }


}
