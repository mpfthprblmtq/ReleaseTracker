import {createSlice} from "@reduxjs/toolkit";

export const artistSlice = createSlice({
  name: 'artists',
  initialState: {
    artist: '1ikID9RZZMvkuBGDWrqajq'
  },
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload;
    }
  }
});

export const { setArtist } = artistSlice.actions;
export default artistSlice.reducer;