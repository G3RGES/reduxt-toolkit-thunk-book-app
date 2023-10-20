import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3009/books");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: null,
    isLoading: false,
  },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      // console.log(action);//TESTING
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
      // console.log(action);//TESTING
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      // console.log(action);//TESTING
    },
  },
});

export default bookSlice.reducer;
