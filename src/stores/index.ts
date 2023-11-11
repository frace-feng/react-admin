import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';

import counterReducer from './counterSlice.js';
import menuSlice from './menuSlice.js';
import loginSlice from './loginSlice.js';
import client from '../api/client.js'

export default configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuSlice,
    login:loginSlice
  }
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // const response = await client.get('/fakeApi/posts')
  // return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  }
)