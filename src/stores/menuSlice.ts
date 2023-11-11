import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'menu',
  initialState: {
    value: {
      collapsed: false
    }
  },
  reducers: {
    setCollapsed: (state, action) => {
      state.value.collapsed = action.payload;
    }
  }
})

export const { setCollapsed } = counterSlice.actions

export default counterSlice.reducer