import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPageComponent } from './app-page/app-page.component';
import { SelectedDayComponent } from './app-page/components/short-forecast/selected-day/selected-day.component';

const routes: Routes = [
    {
        path: 'homepage',
        redirectTo: 'day/1'
    },
    {
        path: 'day',
        children: Array.from({ length: 7 }, (_, dayIndex) => {
            const dayChildren = Array.from({ length: 24 }, (_, hourIndex) => {
                return {
                    path: `${hourIndex}`,
                    component: AppPageComponent
                };
            });

            return {
                path: `${dayIndex + 1}`,
                component: AppPageComponent,
                children: dayChildren
            };
        })
    }
];







@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
