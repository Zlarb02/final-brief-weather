import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentDayComponent } from './current-day/current-day.component';
import { SelectedDayComponent } from './selected-day/selected-day.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CurrentDayComponent,
    SelectedDayComponent,
    HourlyForecastComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CurrentDayComponent,
    SelectedDayComponent,
    HourlyForecastComponent]
})
export class ShortForecastModule { }
