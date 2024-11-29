import { configureStore } from "@reduxjs/toolkit";
import journalDetail from "../features/journals/journalDetailSlicer";

// digunakan untuk memasarkan produknya
export const store = configureStore({
  reducer: {
    journalDetail,
  },
});
