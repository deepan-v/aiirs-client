// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

export type toggleState = {
  sideBar: boolean;
};

export type updateAction = {
  toggleState: (state: boolean) => void;
};

export type CounterStore = toggleState & updateAction;

export const defaultInitState: toggleState = {
  sideBar: false,
};

export const createCounterStore = (initState: toggleState = defaultInitState) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    toggleState: () => set((state) => ({ sideBar: !state.sideBar })),
  }));
};
