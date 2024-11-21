import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-8">
      <a class="btn btn-primary" routerLink="list">Book List</a>
      <a class="btn btn-primary" routerLink="stats">Book List</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {}
