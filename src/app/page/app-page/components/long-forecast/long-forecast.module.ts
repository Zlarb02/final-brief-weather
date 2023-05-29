import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SevenDaysComponent } from './seven-days/seven-days.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SevenDaysComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SevenDaysComponent
  ]
})
export class LongForecastModule { }
