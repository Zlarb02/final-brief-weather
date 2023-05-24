import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Daily } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-seven-days',
  templateUrl: './seven-days.component.html',
  styleUrls: ['./seven-days.component.scss']
})
export class SevenDaysComponent implements AfterViewInit {
  @Input() currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;
  public dailyForecast!: Daily;
  public dates!: string[];
  public sevenWeather!: number[];
  public sevenWeatherDescriptions!: string[];


  constructor(private weatherService: WeatherService) { }

  ngAfterViewInit(): void {
    if (this.weather != undefined) {
      this.getDailyForecast();
    }
  }

  getDailyForecast() {
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          this.dates = weather.daily.time;
          this.sevenWeatherDescriptions = weather.daily.weathercode.map(code => this.weatherService.getWeatherDescription(code));
          return this.dailyForecast = weather.daily;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}