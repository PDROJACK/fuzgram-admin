import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IinitialStateType, Post } from "./postTypes";
import axios from "axios";
import { API_URL } from "../../app/constants";
import { app, auth } from "../../app/firebasConfig";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendInitialPostSetRequest = createAsyncThunk<Post[], string>(
  "data/sendInitialPostSetRequest",
  async (social, thunkApi) => {
    try {
      const res = await api.get(`/user/${social}`, {
        headers: {
          Authentication: await auth.currentUser.getIdToken() ,
        },
      });

      if (res.status === 400) {
        // Return the known error for future handling
        return thunkApi.rejectWithValue(res.data);
      }

      console.log(res.data);
      return res.data as Post[];
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.toString());
    }
  }
);

const initialState: IinitialStateType = {
  modal: false,
  posts: [
    {
      _id: "123",
      id: "1",
      uid: "pdrojack",
      links: [{ url: "spotify", website: "http://spotify.com/pdrojack" }],
      caption: "Hello this is mellow",
      media_url: "http://media.url",
      media_type: "image",
    },
  ],
};

export const postSlice = createSlice({
  name: "post",

  initialState,

  reducers: {
    flipModal: (state) => {
      state.modal = !state.modal;
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[]}>) => { state.posts = action.payload.posts }
  },
  extraReducers: (builder) => {
    builder.addCase(sendInitialPostSetRequest.fulfilled, (state, action) => {
      state.posts = action.payload
    })
  }
});



export const selectPosts = (state: RootState) => state.post.posts;
export const selectModal = (state: RootState) => state.post.modal;

export const { flipModal, setPosts } = postSlice.actions;

export default postSlice.reducer;
