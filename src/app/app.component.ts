import { Component, OnInit } from '@angular/core';
import { MeteoService } from './services/meteo.service';
import { InfosMeteo } from './models/infos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  infosMeteo!: InfosMeteo;
  cityName: string = 'lille';
  myCity!: string [];

  constructor(private meteoService: MeteoService) {}

  ngOnInit(): void {
    this.getCityName(this.cityName);
    this.cityName = '';
  }

  onSubmit() {
    this.getCityName(this.cityName);
    this.cityName= '';
    
  }

  getMeteoInfos(longitude: number, latitude: number) {
    this.meteoService.getData(longitude, latitude).subscribe({
      next: (data) => {
        this.infosMeteo = data;
      },
    });
  }


  getCityName(city: string) {
    this.meteoService.getLatAndLonFromCityName(city).subscribe({
      next: (data) => {
        this.getMeteoInfos(Number(data[0].lon), Number(data[0].lat));
        this.myCity= data[0].display_name.split(',');
      },
    });

  }
}

