import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookSortStore } from '../services/book.service';

@Component({
  selector: 'app-book-prefs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h1>Choose the sorting column</h1>
    <ul class="horizontal">
      <li>
        <button class="btn btn-info m-5" (click)="this.store.setColumn('id')">
          id
        </button>
      </li>
      <li>
        <button
          class="btn btn-info m-5"
          (click)="this.store.setColumn('author')"
        >
          author
        </button>
      </li>
      <li>
        <button
          class="btn btn-info m-5"
          (click)="this.store.setColumn('title')"
        >
          title
        </button>
      </li>
      <li>
        <button class="btn btn-info m-5" (click)="this.store.setColumn('year')">
          year
        </button>
      </li>
    </ul>
  `,
  styles: ``,
})
export class BookPrefsComponent {
  store = inject(BookSortStore);
}
