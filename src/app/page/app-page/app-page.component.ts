import { Component } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';
import { CurrentLocationService } from 'src/app/services/current-location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss'],
})
export class AppPageComponent {
  public currentLocation: any | undefined;
  public chosenLocation: any | undefined;
  public weather: any | undefined;
  public cityName: any | undefined;

  constructor(
    private currentLocationService: CurrentLocationService,
    private chosenLocationService: ChosenLocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.currentLocationService.getCurrentLocationFromBrowser().subscribe(
      (location) => {
        this.currentLocation = location;
        console.log(this.currentLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search() {
    this.chosenLocationService.getLatAndLonFromSearch('Paris').subscribe(
      (chosen) => {
        this.chosenLocation = chosen;
        console.log(this.chosenLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getWeather() {
    this.weatherService
      .getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          this.weather = weather;
          console.log(this.weather);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
