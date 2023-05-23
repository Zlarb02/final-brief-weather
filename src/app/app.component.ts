import { Component, OnInit } from '@angular/core';
import { CurrentLocationService } from './services/current-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public something!: any
  constructor(private currentLocationService: CurrentLocationService) { }

  ngOnInit() {
    this.currentLocationService.getCurrentLocation(50, 3)
      .subscribe(
        (data) => {
          this.something = data;
        }
      );
  }

  logResponse() {
    console.log(this.something)
  }
}

