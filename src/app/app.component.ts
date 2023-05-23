import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from './services/current-location.service';
import { ChosenLocationService } from './services/chosen-location.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public currentLocation: any | undefined;
  public chosenLocation: any | undefined;
  public weather: any | undefined;

  constructor(private currentLocationService: CurrentLocationService, private chosenLocationService: ChosenLocationService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentLocationService.getCurrentLocationFromBrowser()
      .subscribe(
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
    this.chosenLocationService.getLatAndLonFromSearch('Paris')
      .subscribe(
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
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
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



