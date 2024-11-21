import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSortStore } from '../services/book.service';

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};
type BookApiResponse = {
  data: BookEntity[];
};

export type column = 'id' | 'title' | 'author' | 'year';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: ` <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th (click)="sortBy('id')">Id</th>
          <th (click)="sortBy('title')">Title</th>
          <th (click)="sortBy('author')">Author</th>
          <th (click)="sortBy('year')">Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of sorted(); track book) {
          <tr>
            <td>
              <a routerLink="../detail/{{ book.id }}">{{ book.id }}</a>
            </td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: ``,
})
export class ListComponent {
  store = inject(BookSortStore);
  prevSortByCol = signal('id');
  //sortByCol = signal('id');

  sortOrder = signal(true);
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  sorted = computed(() =>
    this.books.value()?.sort((a, b) => {
      if (this.sortOrder() === true) {
        if (this.sortByCol() === 'id') return parseInt(a.id) - parseInt(b.id);
        else if (this.sortByCol() === 'author')
          return a.author.localeCompare(b.author);
        else if (this.sortByCol() === 'title')
          return a.title.localeCompare(b.title);
        else if (this.sortByCol() === 'year') return a.year - b.year;
        else return parseInt(a.id) - parseInt(b.id);
      } else {
        if (this.sortByCol() === 'id') return parseInt(b.id) - parseInt(a.id);
        else if (this.sortByCol() === 'author')
          return b.author.localeCompare(a.author);
        else if (this.sortByCol() === 'title')
          return b.title.localeCompare(a.title);
        else if (this.sortByCol() === 'year') return b.year - a.year;
        else return parseInt(b.id) - parseInt(a.id);
      }
    }),
  );
  sortBy(column: string): void {
    if (this.prevSortByCol() === column) this.sortOrder.set(!this.sortOrder());
    //this.sortByCol.set(column);
    this.store.setColumn(column);
    this.prevSortByCol.set(column);
  }

  sortByCol(): string {
    return this.store.column();
  }
}
