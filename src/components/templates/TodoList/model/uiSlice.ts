import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  view: "list" | "cards";
  visibleCount: {
    all: number;
    completed: number;
  };
}

const initialState: UiState = {
  view: "list",
  visibleCount: {
    all: 5,
    completed: 5,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<"list" | "cards">) {
      state.view = action.payload;
    },
    increaseVisibleCount(state, action: PayloadAction<"all" | "completed">) {
      state.visibleCount[action.payload] += 5;
    },
    resetVisibleCount(state, action: PayloadAction<"all" | "completed">) {
      state.visibleCount[action.payload] = 5;
    },
  },
});

export const { setView, increaseVisibleCount, resetVisibleCount } =
  uiSlice.actions;
export default uiSlice.reducer;
