import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { withDevtools } from '@angular-architects/ngrx-toolkit';
type SortState = {
  column: string;
  ascending: boolean;
};

const initialState: SortState = {
  column: 'id',
  ascending: true,
};
export const BookSortStore = signalStore(
  withDevtools('books'),
  withState<SortState>(initialState),
  withMethods((store) => {
    return {
      setColumn: (col: string) => patchState(store, { column: col }),
    };
  }),
  withComputed((store) => {
    return {
      order: computed(() => {
        return store.ascending();
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const saved = store.column();
    },
  }),
);
