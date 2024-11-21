import { HttpResponse, http } from 'msw';
import books from './books';

const handlers = [
  http.get('/api/books', () => {
    return new HttpResponse(JSON.stringify({ data: books }), {
      headers: {
        'Cache-Control': 'max-age=3000',
      },
    });
  }),
];

export default handlers;
