import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

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
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of books.value(); track book) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class BooksComponent {
  books = resource<BookEntity[], unknown>({
    loader: () =>
      fetch('/api/books')
        .then((res) => res.json())
        .then((r) => r.data),
  });
}
