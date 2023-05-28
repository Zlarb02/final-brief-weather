import { Component, Input, SimpleChanges } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Location } from 'src/app/models/location';
import { Daily, Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
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

  @Input() public currentHour!: string;


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

  @Input() public hourlyForecast!: Hourly;
  @Input() public hours!: string[];
  @Input() public hourlyWeather!: number[];
  @Input() public hourlyWeatherDescriptions!: string[];
  @Input() public hourlyWeatherIcons!: string[];
  @Input() public hourlyWeatherTemp!: number[];
  @Input() public hourlyWeatherApparentTemp!: number[];
  @Input() public hourlyWeatherPrecipitationProbability!: number[]

  public currentHourForecast!: { hour: string; temperature: number; apparentTemperature: number; precipitationProbability: number; description: string; icon: string; } | null


  private currentDay!: string;
  public dayIndex!: number;

  public chosenPlace: any;

  constructor(private weatherService: WeatherService, private searchService: SearchService) {
    const url = window.location.pathname;
    this.currentDay = url.charAt(url.length - 1);
    if (this.currentDay === 'e') {
      this.dayIndex = 0
    } else
      this.dayIndex = Number(this.currentDay) - 1;
  }

  ngOnInit() {
    this.searchService.getPlace().pipe(
      debounceTime(1000)
    ).subscribe((osmObj) => {
      this.chosenPlace = osmObj;
      this.getDailyForecast();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
      setTimeout(() => {
        this.currentHourForecast = this.getCurrentHourForecast();
      }, 500); // dépendant de l'api
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
    else if (this.currentLocation)
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

  getCurrentHourForecast() {
    const currentHourIndex = this.hours.findIndex(hour => hour === `${this.currentHour}:00`);
    if (currentHourIndex !== -1) {
      const currentHourForecast = {
        hour: this.hours[currentHourIndex],
        temperature: this.hourlyWeatherTemp[currentHourIndex],
        apparentTemperature: this.hourlyWeatherApparentTemp[currentHourIndex],
        precipitationProbability: this.hourlyWeatherPrecipitationProbability[currentHourIndex],
        description: this.hourlyWeatherDescriptions[currentHourIndex],
        icon: this.hourlyWeatherIcons[currentHourIndex]
      };
      return currentHourForecast;
    } else {
      return null;
    }
  }


}
