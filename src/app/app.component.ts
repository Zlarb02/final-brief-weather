import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  laltitude!: number;
  longitude!: number;
  public adresse!: [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const watchId = navigator.geolocation.watchPosition((position) => {
      this.laltitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });

    const url =
      'https://nominatim.openstreetmap.org/reverse?lat=50.6288692&lon=3.0621601&format=json';

    this.http.get(url).subscribe(
      (response: any) => {
        this.adresse = response.display_name.split(',');
        console.log(this.adresse);
      }
      // (error: any) => {
      //   console.error(error);
      // }
    );
  }
  title = 'final-brief-meteo';
}
