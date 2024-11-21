import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './pages/list.component';
import { StatsComponent } from './pages/stats.component';
import { DetailComponent } from './pages/detail.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
