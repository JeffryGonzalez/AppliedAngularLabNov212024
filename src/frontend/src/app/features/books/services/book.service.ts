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
export const CounterStore = signalStore(
  withDevtools('books'),
  withState<SortState>(initialState),
  withMethods((store) => {
    return {
      setBy: (by: CountBy) => patchState(store, {}),
    };
  }),
  withComputed((store) => {
    return {
      fizzBuzz: computed(() => {
        return '';
      }),
    };
  }),
  withHooks({
    onInit(store) {
      const saved = localStorage.getItem('counter');
    },
  }),
);
