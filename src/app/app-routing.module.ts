import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'day/1'
  },
  {
    path: 'day',
    children: Array.from({ length: 7 }, (_, dayIndex) => {
      const dayChildren = Array.from({ length: 24 }, (_, hourIndex) => {
        return {
          path: `${hourIndex}`,
          loadChildren: () => import('./page/page.module').then(m => m.PageModule)
        };
      });

      return {
        path: `${dayIndex + 1}`,
        loadChildren: () => import('./page/page.module').then(m => m.PageModule),
        children: dayChildren
      };
    })
  },
  {
    path: '**',
    loadChildren: () => import('./core/not-found/not-found-routing.module').then(m => m.NotFoundRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
