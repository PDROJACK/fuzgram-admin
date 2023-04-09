import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../app/constants";
import { RootState } from "../../app/store";
import { IsendAsyncIntegrationRequest } from "./userTypes";

type Link = {
  website: string;
  url: string;
};

type Integration = {
  social: string;
  username: string;
  status: boolean;
  enabled: boolean;
  timestamp?: Date
};

export interface User {
  uid: string;
  username: string;
  instagram: string;
  links: Link[];
  email: string;
  profile: string;
  userToken: string | null;
  integrations: Integration[];
}

const initialState: User = {
  uid: "1234",
  username: "pdrojack",
  instagram: "pdrojack",
  links: [
    {
      website: "spotify",
      url: "http://spotify.com/pdrojac",
    },
  ],
  integrations: [
    {
      social: "insta",
      username: "door_darshan",
      status: false,
      enabled: false,
      timestamp: new Date("124")
    },
    {
      social: "twitter",
      username: "door_darshan",
      status: false,
      enabled: true,
      timestamp: new Date("124")
    },
  ],
  email: "pdro@jack.com",
  profile: "profile.photo",
  userToken: null,
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendAsyncIntegrationRequest = createAsyncThunk<
  object,
  IsendAsyncIntegrationRequest
>("data/sendAsyncIntegrationRequest", async (request, thunkApi) => {
  try {
    const res = await api.post("/integrate", request);

    if (res.status === 400) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue(res.data);
    }

    return res.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.toString());
  }
});

export const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    getProducts: (state, action: PayloadAction<string>) => {
      // find product by movie id
    },

    addProduct: (state, action: PayloadAction<number>) => {
      // Get Input about product and add it to DB
    },
    toggleIntegration: (state, action: PayloadAction<number>) => {
      state.integrations[action.payload].enabled = !state.integrations[action.payload].enabled
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendAsyncIntegrationRequest.pending, (state) => {
        return state;
      })
      .addCase(sendAsyncIntegrationRequest.fulfilled, (state, action) => {
        state.integrations.forEach((i) => {
          i.status = true;
        });
      })
      .addCase(sendAsyncIntegrationRequest.rejected, (state, action) => {
        return state;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectIntegrations = (state: RootState) => state.user.integrations;

export const { getProducts, addProduct, toggleIntegration } = userSlice.actions;

export default userSlice.reducer;
