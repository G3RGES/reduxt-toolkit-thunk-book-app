import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

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
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.author = getState().auth.name;
      const res = await fetch("http://localhost:3009/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const date = await res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return date;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "DELETE",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // console.log(res);//TESTING
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3009/books/${item.id}`, {
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // console.log(res);//TESTING
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
    bookInfo: null,
  },
  extraReducers: {
    // GET BOOKS
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
    // INSERT/ADD BOOKS
    [insertBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //DELETE BOOKS
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el.id !== action.payload.id);
      // console.log(action);//TESTING
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //GET BOOK INFO
    [getBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
