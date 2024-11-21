import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  computed,
} from '@angular/core';

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
@Component({
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h3>Book Stats</h3>
    <p>Total: {{ total() }}</p>
    <p>
      Earliest year:
      {{ minYear() }}
    </p>
    <p>Most recent year: {{ maxYear() }}</p>
    <p>Average number of pages per book: {{ averagePages() }}</p>
  `,
  styles: ``,
})
export class StatsComponent {
  total = computed(() => this.books.value()?.length);
  minYear = computed(() =>
    this.books.value()?.reduce((min, b) => Math.min(min, b.year), Infinity),
  );
  maxYear = computed(() =>
    this.books.value()?.reduce((max, b) => Math.max(max, b.year), -Infinity),
  );
  averagePages = computed(() => {
    const sumOfPages = this.books
      .value()
      ?.map((b) => b.pages)
      .reduce((acc, curr) => acc + curr, 0);
    const total = this.total() ? this.total() : 0;
    if (total && sumOfPages) {
      if (sumOfPages > 0) return sumOfPages / total;
    }
    return null;
  });
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
