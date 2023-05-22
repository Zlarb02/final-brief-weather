import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent implements OnInit {
  public latitude!: number;
  public longitude!: number;
  public adress!: string;

  constructor(http:HttpClient){}

  getAdress():string {
    console.log(this.adress);
    return this.adress
  }


  ngOnInit(): void {
    const watchId = navigator.geolocation.watchPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.getAdress()
  }
}
const url = 'https://nominatim.openstreetmap.org/reverse?lat=3&lon=50'

