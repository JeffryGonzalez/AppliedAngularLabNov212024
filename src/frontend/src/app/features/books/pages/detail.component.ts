import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
  signal,
} from '@angular/core';
import { BookEntity } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p class="m-10">Book Detail For ID: {{ this.bookId() }}</p>
    <div>
      <pre>{{ this.books.value() | json }}</pre>
    </div>
  `,
  styles: ``,
})
export class DetailComponent {
  route = inject(ActivatedRoute);
  bookId = signal(this.route.snapshot.paramMap.get('id'));
  books = resource<BookEntity, unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) =>
          r.data.filter((d: { id: string | null }) => d.id === this.bookId()),
        ),
  });
}
