import { createSlice } from '@reduxjs/toolkit'

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthorized: true
  },
  reducers: {
    loginIn: (state, action):void => {
      const { username, password } = action.payload;
      console.log(action)
      if (username === 'admin' && password === '123') {
        state.isAuthorized = true;
      } else {
        state.isAuthorized = false;
      }

    },
    loginOut() { }
  }
})

export const { loginIn, loginOut } = loginSlice.actions

export default loginSlice.reducer
