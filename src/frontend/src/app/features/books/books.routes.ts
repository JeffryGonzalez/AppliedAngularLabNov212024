import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './pages/list.component';
import { StatsComponent } from './pages/stats.component';
import { DetailComponent } from './pages/detail.component';
import { BookPrefsComponent } from './pages/book.prefs.component';
import { BookSortStore } from './services/book.service';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BookSortStore],
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
        path: 'pref',
        component: BookPrefsComponent,
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
