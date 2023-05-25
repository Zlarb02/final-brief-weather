import { Component, OnInit } from '@angular/core';
import { ChosenLocationService } from 'src/app/services/chosen-location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  cityName!: string;
  myCity!: any;

  constructor(private ChosenLocationService: ChosenLocationService) {}

  ngOnInit(): void {
    // this.cityName = this.ChosenLocationService.getLocation();
  }

  onSubmit() {
    console.log('onsubmit');

    this.getCityName(this.cityName);
    this.cityName = '';
  }


  getCityName(city: string) {
    this.ChosenLocationService.getLatAndLonFromSearch(city).subscribe({
      next: (data) => {
        console.log(data);

        //this.getLocation(Number(data[0].lon), Number(data[0].lat));
        this.myCity = data[0].display_name;

         console.log(this.myCity); // display_name est une chaine de caracteres separes avec des virgules
      },
    });
  }
}
