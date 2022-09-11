import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    addToFav: (state, { payload}) => {
      state.push(payload)
    },
    removeFromFav: (state, { payload }) => {
      return state.filter(show => show.mal_id !== payload.mal_id)
    },
  },
})

export const { addToFav, removeFromFav } = slice.actions

export default slice.reducer
