import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../app/constants";
import { RootState } from "../../app/store";
import { IIntegration, IupdateIntegration, Link, updateIntegrationType } from "./integrationTypes";
import { stat } from "fs";

const initialState: IIntegration = {
  _id: "",
  bio: "",
  enabled: false,
  links: [],
  social: "",
  uid: "",
  username: "",
  selectedComponent: null
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendUpdateIntegrationRequest = createAsyncThunk<
  IIntegration,
  IupdateIntegration
>("data/sendUpdateIntegrationRequest", async (request, thunkApi) => {
  try {
    const res = await api.patch("/integrate", request);

    if (res.status === 400) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue(res.data);
    }

    return res.data;

  } catch (error: any) {
    return thunkApi.rejectWithValue(error.toString());
  }
});

export const integrationSlice = createSlice({
  name: "integration",

  initialState,

  reducers: {
    setIntegration: (state, action: PayloadAction<{ integration: IIntegration }>) => {
        const { bio, _id, enabled, links, social, uid, username, profile} = action.payload.integration

        state.bio = bio;
        state.links = links;
        state.profile = profile;
        state.username = username;
        state._id = _id;
        state.enabled = enabled;
        state.links = links;
        state.social = social;
        state.uid = uid;

    },
    updateIntegration: (state, action: PayloadAction<{ i: number, newIntegration: updateIntegrationType }>) => {
        const { bio, links, profile, username } = action.payload.newIntegration

        state.bio = bio;
        state.links = links;
        state.profile = profile;
        state.username = username;

        // #TODO: Send request to update integration 

    }, 
    toggleIntegration: (state, action: PayloadAction<number>) => {
        state[action.payload].enabled = !state[action.payload].enabled

        // #TODO: Sync with backend
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    updateBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
    updateLinks: (state, action: PayloadAction<Link[]>) => {
      state.links = action.payload
    },
    updateProfile: (state, action: PayloadAction<string>) => {
      state.profile = action.payload
    },
    setSelectedComponent: (state, action) => {
      state.selectedComponent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUpdateIntegrationRequest.fulfilled, (state, action) => {
        // #TODO : fetch the state again 
      })
  },


});

export const selectIntegration = (state: RootState) => state.integration;
export const getSelectedComponent = (state: RootState) => state.integration.selectedComponent;

export const { updateIntegration,updateLinks, updateBio, updateProfile, setIntegration, updateUsername, setSelectedComponent } = integrationSlice.actions;

export default integrationSlice.reducer;