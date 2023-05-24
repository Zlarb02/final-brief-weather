import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPageComponent } from './app-page/app-page.component';
import { SelectedDayComponent } from './app-page/components/short-forecast/selected-day/selected-day.component';

const routes: Routes = [
    {
        path: 'homepage',
        component: AppPageComponent
    },
    {
        path: 'day',
        children:
            [
                {
                    path: '1',
                    component: AppPageComponent
                },
                {
                    path: '2',
                    component: AppPageComponent
                },
                {
                    path: '3',
                    component: AppPageComponent
                },
                {
                    path: '4',
                    component: AppPageComponent
                },
                {
                    path: '5',
                    component: AppPageComponent
                },
                {
                    path: '6',
                    component: AppPageComponent
                },
                {
                    path: '7',
                    component: AppPageComponent
                },
            ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
