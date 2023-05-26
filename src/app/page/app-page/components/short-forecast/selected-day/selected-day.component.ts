import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Daily, Hourly } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-selected-day',
  templateUrl: './selected-day.component.html',
  styleUrls: ['./selected-day.component.scss']
})
export class SelectedDayComponent {
  @Input() public currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;

  @Input() public currentHour: any | undefined;


  @Input() public getDailyForecast: any;
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

  public currentHourForecast!: any;


  private currentDay!: string;
  public dayIndex!: number;

  constructor(private weatherService: WeatherService, private router: Router, private activatedRoute: ActivatedRoute) {
    const url = window.location.pathname;
    this.currentDay = url.charAt(url.length - 1);
    if (this.currentDay === 'e') {
      this.dayIndex = 0
    } else
      this.dayIndex = Number(this.currentDay) - 1;

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
      this.getHourlyForecast(this.dayIndex);
      setTimeout(() => {
        this.currentHourForecast = this.getCurrentHourForecast();
      }, 1000); // dépendant de l'api
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
          
          setTimeout(() => {
          }, 10); // non dépendant de l'api
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getCurrentHourForecast() {
    console.log(this.currentHour)
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
      console.log(currentHourForecast);

      return currentHourForecast;
    } else {
      return null;
    }
  }


}
