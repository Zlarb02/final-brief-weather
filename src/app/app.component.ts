import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from './services/current-location.service';
import { ChoosenLocationService } from './services/choosen-location.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public currentLocation: any | undefined;
  public choosenLocation: any | undefined;
  public weather: any | undefined;

  constructor(private currentLocationService: CurrentLocationService, private choosenLocationService: ChoosenLocationService, private weatherService: WeatherService) { }

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
    this.choosenLocationService.getLatAndLonFromSearch('Paris')
      .subscribe(
        (choosen) => {
          this.choosenLocation = choosen;
          console.log(this.choosenLocation);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getWeather() {
    this.weatherService.getSevenDaysForecast(this.currentLocation.lat, this.currentLocation.lon)
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



