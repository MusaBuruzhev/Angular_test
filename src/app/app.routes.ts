import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './bascket/bascket.component';



export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
//   {
//     path: '**',
//     component: NotFoundComponent,
//   },
];