import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
})
export class CurrentDayComponent {
  // cityName!: string;
  // onSubmit() {
  //   console.log(this.cityName);

    // this.getCityName(this.cityName);
  //  this.cityName = '';
  // }

  @Input() currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;
}
