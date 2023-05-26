import { Component, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hourly } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {
  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  @Input() public currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;

  @Input() public currentHour: any | undefined;

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
      this.getHourlyForecast(this.dayIndex);
    }
  }

  scrollToCurrentHour() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const currentHourCard = this.cardContainer.nativeElement.querySelector('.current-hour-card');
      if (currentHourCard) {
        currentHourCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  isCurrentHour(hour: string): boolean {
    let currentHourToCompare = `${this.currentHour}:00`;
    if (hour === 'currentHourToCompare') {
      return true
    }
    else
      return false
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
            this.scrollToCurrentHour();
          }, 10);
        },
        (error) => {
          console.error(error);
        }
      );
  }


}
