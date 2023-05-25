import { Component } from '@angular/core';
import { CurrentLocationService } from 'src/app/services/current-location.service';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent {
  public currentLocation: any | undefined;
  public chosenLocation: any | undefined;
  public weather: any | undefined;

  public date = new Date();
  public currentHour = this.date.getHours();
  public currentMinute = this.date.getMinutes();

  constructor(private currentLocationService: CurrentLocationService) { }

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
}