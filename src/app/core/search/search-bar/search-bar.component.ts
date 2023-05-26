import { Component, OnInit } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';
import { CurrentLocationService } from 'src/app/services/current-location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  cityName!: string;
  myCity!: any;// le nom de la ville qu'on va afficher sur la page

  constructor(
    private chosenLocationService: ChosenLocationService,
    private currentLocationService: CurrentLocationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('onsubmit');

    this.getCityName(this.cityName);
    this.cityName = '';
  }

  getCityName(city: string) {
    this.chosenLocationService.getLatAndLonFromSearch(city).subscribe({
      next: (data) => {
        //console.log("data ==>", data);
        //console.log('data ==>', Number(data[0].lon), Number(data[0].lat));
        this.currentLocationService
          .getCurrentLocation(Number(data[0].lat), Number(data[0].lon))
          .subscribe({
            next: (location) => {
              console.log('location ==>', location);
              this.myCity = location.address.city;
              console.log(this.myCity);  
            },
          });
        
      },
    });
  }
}
