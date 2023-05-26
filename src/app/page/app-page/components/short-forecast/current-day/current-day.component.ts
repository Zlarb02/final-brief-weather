import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss'],
})
export class CurrentDayComponent {
  @Input() public cityName: any | undefined;
}
