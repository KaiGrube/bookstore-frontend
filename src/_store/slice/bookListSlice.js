import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const Url = `http://localhost:8080/books`;

export const initialBookListState = {
  bookList: [],
  isLoaded: false,
  filter: 'Python',
  limit: 5,
  sort: 'title',
  page: 1,
  totalNumberOfResults: undefined,
  numberOfPages: undefined,
}

export const bookListSlice = createSlice({
  name: 'bookList',
  initialState: initialBookListState,
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      console.log(action.payload)
      state.page = action.payload;
    },
    setTotalNumberOfResults: (state, action) => {
      state.totalNumberOfResults = action.payload;
    },
    setNumberOfPages: (state, action) => {
      state.numberOfPages = action.payload;
    }
  },
})

export const {
  setBookList,
  setIsLoaded,
  setFilter,
  setLimit,
  setSort,
  setPage,
  setTotalNumberOfResults,
  setNumberOfPages
} = bookListSlice.actions;

export const fetchBooks = () => async (dispatch, getState) => {
  dispatch(setIsLoaded(false));
  const filter = getState().bookList.filter;
  const sort = getState().bookList.sort;
  const limit = getState().bookList.limit;
  const page = getState().bookList.page;
  console.log(`${Url}/search?filter=${filter}&sort=${sort}&limit=${limit}&page=${page}`)

  try {
    const response = await axios({
      method: 'get',
      url: `${Url}/search?filter=${filter}&sort=${sort}&limit=${limit}&page=${page}`,
    });
    dispatch(setBookList(response.data.results));
    console.log(response.data.results)
    dispatch(setTotalNumberOfResults(response.data.totalNumberOfResults));
    dispatch(setNumberOfPages(response.data.numberOfPages));
    dispatch(setIsLoaded(true));
  } catch (error) {
    console.log('Could not fetch books from store api ' + Url);
    console.log(error.message);
  }
}

export const updateFilter = (filter) => async (dispatch, getState) => {
  dispatch(setFilter(filter));
  dispatch(setPage(1));
  dispatch(fetchBooks());
}


export const setPage2 = (page) => async dispatch => {
  console.log(page)
  dispatch(setPage(page));
  dispatch(fetchBooks());
}

export const previousPage = () => async (dispatch, getState) => {
  const page = getState().bookList.page;
  if (page > 1 ) {
    dispatch(setPage(page - 1));
    dispatch(fetchBooks());
  }
}

export const nextPage = () => async (dispatch, getState) => {
  const page = getState().bookList.page;
  const numberOfPages = getState().bookList.numberOfPages;
  if (page < numberOfPages ) {
    dispatch(setPage(page + 1));
    dispatch(fetchBooks());
  }
}

export const selectFilter = state => state.bookList.filter;
export const selectLimit = state => state.bookList.limit;
export const selectSort = state => state.bookList.sort;
export const selectBookList = state => state.bookList.bookList;
export const selectIsLoaded = state => state.bookList.isLoaded;
export const selectPage = state => state.bookList.page;
export const selectTotalNumberOfResults = state => state.bookList.totalNumberOfResults;
export const selectNumberOfPages = state => state.bookList.numberOfPages;

export default bookListSlice.reducer;