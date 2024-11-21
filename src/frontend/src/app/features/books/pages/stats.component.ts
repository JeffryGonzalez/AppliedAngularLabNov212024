import { Component, computed, resource } from '@angular/core';
import { BookEntity } from '../books.component';

@Component({
  selector: 'app-books-stats',
  template: `
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Total Books</div>
        <div class="stat-value">{{ totalBooks() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Earliest Year</div>
        <div class="stat-value">{{ earliestYear() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Latest Year</div>
        <div class="stat-value">{{ latestYear() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Average Pages</div>
        <div class="stat-value">{{ averagePages() }}</div>
      </div>
    </div>
  `,
})
export class ListComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });

  totalBooks = computed(() => this.books.value()?.length ?? 0);

  earliestYear = computed(() =>
    Math.min(...(this.books.value()?.map((b) => b.year) ?? [])),
  );

  latestYear = computed(() =>
    Math.max(...(this.books.value()?.map((b) => b.year) ?? [])),
  );

  averagePages = computed(() => {
    const books = this.books.value();
    if (!books?.length) return 0;
    const total = books.reduce((sum, book) => sum + book.pages, 0);
    return Math.round(total / books.length);
  });
}
