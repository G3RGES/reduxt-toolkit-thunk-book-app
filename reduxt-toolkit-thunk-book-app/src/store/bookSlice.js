import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getBooks = createAsyncThunk("book/getBooks", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3009/books");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: null,
  },
  extraReducers: {
    [getBooks]: (state, action) => {},
  },
});

export default bookSlice.reducer;
