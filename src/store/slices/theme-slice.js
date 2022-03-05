import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    background: "dashboard",
  },
  reducers: {
    changeBackground: (state, action) => {
      state.background = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeBackground } = themeSlice.actions

export default themeSlice.reducer