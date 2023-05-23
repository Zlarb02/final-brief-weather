import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-seven-days',
  templateUrl: './seven-days.component.html',
  styleUrls: ['./seven-days.component.scss']
})
export class SevenDaysComponent {
  @Input() currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;
  public dates!: string[];

  constructor(private weatherService: WeatherService) { }


  getSevenDaysWeather() {
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          return this.dates = weather.daily.time;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
