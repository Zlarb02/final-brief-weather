import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent implements OnInit {
  public latitude: number=0;
  public longitude: number=0;
  public adress: string ='';

  constructor(http:HttpClient){}

  getAdress():string {
    console.log(this.adress);
    return this.adress
  }


  ngOnInit(): void {


    const url = `https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}`;
    // Utilisez l'URL avec la latitude et la longitude mises à jour
    console.log(url);

    const watchId = navigator.geolocation.watchPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.getAdress()
    console.log
  }
}


