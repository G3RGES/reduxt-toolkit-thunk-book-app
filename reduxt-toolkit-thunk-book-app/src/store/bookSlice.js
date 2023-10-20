import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getBooks = createAsyncThunk("", async () => {});

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: null,
  },
  reducers: {},
});

export default bookSlice.reducer;
