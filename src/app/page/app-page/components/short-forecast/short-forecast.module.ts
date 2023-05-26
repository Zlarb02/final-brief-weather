import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentDayComponent } from './current-day/current-day.component';
import { SelectedDayComponent } from './selected-day/selected-day.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { SearchBarComponent } from 'src/app/core/search/search-bar/search-bar.component';

@NgModule({
  declarations: [
    CurrentDayComponent,
    SelectedDayComponent,
    HourlyForecastComponent
  ],
  imports: [CommonModule],
  exports: [
    CurrentDayComponent,
    SelectedDayComponent,
    HourlyForecastComponent
  ],
})
export class ShortForecastModule {}
