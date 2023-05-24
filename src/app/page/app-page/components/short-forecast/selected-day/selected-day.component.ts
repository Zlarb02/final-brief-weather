import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Daily } from 'src/app/models/weather';
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
    }
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
        },
        (error) => {
          console.error(error);
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
