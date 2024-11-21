import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h3>Books</h3>
    <div class="flex gap-8">
      <a class="btn btn-primary btn-sm" routerLink="list">List of books</a>
      <a class="btn btn-primary btn-sm" routerLink="stats">Book Stats</a>
    </div>
    <div class="p-12">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class BooksComponent {}
