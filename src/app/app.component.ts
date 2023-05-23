import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from './services/current-location.service';
import { Weather } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  weather!: object;
  something!: string;

  constructor(private currentLocationService: CurrentLocationService) {}

  ngOnInit() {
    this.currentLocationService.getCurrentLocation(50, 3).subscribe((data) => {
      this.weather = data;
    });
  }

  logResponse() {
    console.log(this.something);
  }

  getWeatherInfos(longitude: number, latitude: number) {
    this.currentLocationService
      .getCurrentLocation(longitude, latitude)
      .subscribe({
        next: (data) => {
          this.weather = data;
          console.log(data);
        },
      });
  }
}

