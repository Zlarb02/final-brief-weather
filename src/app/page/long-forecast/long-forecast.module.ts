import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SevenDaysComponent } from './seven-days/seven-days.component';



@NgModule({
  declarations: [
    SevenDaysComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SevenDaysComponent
  ]
})
export class LongForecastModule { }
