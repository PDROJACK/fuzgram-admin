import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Link = {
  website: string;
  url: string;
};
export interface Post {
  id: string;
  username: string;
  instagram: string;
  links: Link[];
  email: string;
  profile: string;
  content: string;
}

type IinitialStateType = {
  modal: boolean;
  posts: Post[];
};

const initialState: IinitialStateType = {
  modal: false,
  posts: [
    {
      id: "1",
      username: "pdrojack",
      instagram: "pdrojack",
      links: [
        {
          website: "spotify",
          url: "http://spotify.com/pdrojac",
        },
      ],
      email: "pdro@jack.com",
      profile: "profile.photo",
      content: "Hello this is mellow",
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

    getProducts: (state, action: PayloadAction<string>) => {
      // find product by movie id
    },

    addProduct: (state, action: PayloadAction<number>) => {
      // Get Input about product and add it to DB
    },
  },
});

export const selectPosts = (state: RootState) => state.post.posts;
export const selectModal = (state: RootState) => state.post.modal;

export const { getProducts, addProduct, flipModal } = postSlice.actions;

export default postSlice.reducer;
