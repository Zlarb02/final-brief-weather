import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Location } from 'src/app/models/location';
import { Hourly, Weather } from 'src/app/models/weather';
import { SearchService } from 'src/app/services/search.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {
  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  @Input() public currentLocation!: Location;
  @Input() public chosenLocation!: Location;
  @Input() public weather!: Weather;

  @Input() public currentHour!: string;

  public hourlyForecast!: Hourly;
  public hours!: string[];
  public hourlyWeather!: number[];
  public hourlyWeatherDescriptions!: string[];
  public hourlyWeatherIcons!: string[];
  public hourlyWeatherTemp!: number[];
  public hourlyWeatherApparentTemp!: number[];
  public hourlyWeatherPrecipitationProbability!: number[]

  private currentDay!: string;

  public chosenPlace: any;

  @Input() public dayIndex!: number;

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
      this.getHourlyForecast(this.dayIndex);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getHourlyForecast(this.dayIndex);
    }
  }

  scrollToCurrentHour() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const currentHourCard = this.cardContainer.nativeElement.querySelector('.current-hour-card');
      if (currentHourCard) {
        currentHourCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }

  scrollTo10() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const tenHourCard = this.cardContainer.nativeElement.querySelector('.ten-hour-card');
      if (tenHourCard) {
        tenHourCard.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }

  isCurrentHour(hour: string): boolean {
    let currentHourToCompare = `${this.currentHour}:00`;
    if (hour === `${currentHourToCompare}`) {
      return true
    }
    else
      return false
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
            this.hourlyWeatherDescriptions = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherDescription(code));
            this.hourlyWeatherIcons = weather.hourly.weathercode.slice(startIndex, endIndex).map(code => this.weatherService.getWeatherIcon(code));
            if (dayIndex === 0)
              setTimeout(() => {
                this.scrollToCurrentHour()
              }, 10);
            if (dayIndex !== 0)
              setTimeout(() => {
                this.scrollTo10()
              }, 10);
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
            if (dayIndex === 0)
              setTimeout(() => {
                this.scrollToCurrentHour()
              }, 10);
            if (dayIndex !== 0)
              setTimeout(() => {
                this.scrollTo10()
              }, 10);
          }
        );
  }


}
