import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../api/axios'
import { csrf, getUserAPI, logoutAPI, updateUserAPI } from '../api/userAPI'

const initialState = {
  user: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await getUserAPI()
    return response.data
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await logoutAPI()
    return response.data;
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    const response = await updateUserAPI(data);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logout.fulfilled, (state, _) => {
      state.user = null;
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export const getUser = (state) => state.user.user

export default userSlice.reducer