import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3009/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBooks = createAsyncThunk(
  "book/insertBooks",
  async (bookData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3009/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {}
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      // console.log(action);//TESTING
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
      // console.log(action);//TESTING
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // console.log(action);//TESTING
    },
  },
});

export default bookSlice.reducer;
