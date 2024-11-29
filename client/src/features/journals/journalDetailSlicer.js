import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  journal: {},
  error: "",
};

export const journalDetailSlicer = createSlice({
  name: "journalDetail", //ini cuma buat debugging saja
  initialState,
  reducers: {
    // fetch selalu pending, failed, success
    fetchPending: (state) => {
      state.loading = true;
      // yang di bawah ini untuk mereset supaya jadi nilai awal
      state.journal = initialState.journal;
      state.error = initialState.error;
    },
    // action di fetch pending ga berguna, hapus
    fetchSuccess: (state, action) => {
      console.log(action);

      state.loading = initialState.loading;
      // yang di bawah ini untuk mereset supaya jadi nilai awal
      state.journal = action.payload;
      state.error = initialState.error;
    },
    fetchFailed: (state, action) => {
      console.log(action);
      state.loading = initialState.loading;
      // yang di bawah ini untuk mereset supaya jadi nilai awal
      state.journal = initialState.journal;
      state.error = action.error;
    },
  },
});

// bikin thunk yang berfungsimenjadi middleware
// buat fetchAsyncnya
// kebetulan kita bikin function, by default, dispatch langsung diterima jika pakai thunk
export const fetchAsync = (base_url, id) => async (dispatch) => {
  try {
    // setLoading(true);
    // pending
    dispatch(fetchPending());
    const { data } = await axios.get(`${base_url}/journal/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    //data.journal akan masuk ke dalam action.payload
    dispatch(fetchSuccess(data.journal));
    // setJournal(data.journal);
    // console.log(journal);
  } catch (error) {
    // console.log(error);
    dispatch(fetchFailed(error));
  }
};

// Action creators are generated for each case reducer function
export const { fetchPending, fetchSuccess, fetchFailed } = journalDetailSlicer.actions;

export default journalDetailSlicer.reducer;
