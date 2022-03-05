import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter-slice'
import themeSlice from './slices/theme-slice'

export default configureStore({
  reducer: {
      counter: counterSlice,
      theme: themeSlice,
  },
})