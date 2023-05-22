import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../app/constants";
import { RootState } from "../../app/store";
import { IsendAsyncIntegrationRequest, IUser } from "./userTypes";
import {
  IIntegration,
  updateIntegrationType,
} from "../integrations/integrationTypes";
import { auth } from "../../app/firebasConfig";

const initialState: IUser = {
  uid: "1234",
  _id: "23264",
  username: "pdrojack",
  email: "pdro@jack.com",
  integrations: [],
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

    return res.data as IUser;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.toString());
  }
});

export const sendInitialStateRequest = createAsyncThunk<IUser, string>(
  "data/sendInitialStateRequest",
  async (token, thunkApi) => {
    try {
      const res = await api.get("/api/user", {
        headers: {
          Authentication: token,
        },
      });

      if (res.status === 400) {
        // Return the known error for future handling
        return thunkApi.rejectWithValue(res.data);
      }

      return res.data as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.toString());
    }
  }
);

export const sendUpdateIntegrationRequest = createAsyncThunk<IIntegration, IIntegration>(
  "data/sendUpdateIntegrationRequest",
  async (reqBody, thunkApi) => {
    try {
      const res = await api.patch("/api/integration", {
        headers: {
          Authentication: await auth.currentUser.getIdToken(),
        },
        reqBody
      });

      if (res.status === 400) {
        // Return the known error for future handling
        return thunkApi.rejectWithValue(res.data);
      }

      console.log(res.data);

      return res.data as IIntegration;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.toString());
    }
  }
);

export const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    toggleIntegration: (state, action: PayloadAction<number>) => {
      state.integrations[action.payload].enabled =
        !state.integrations[action.payload].enabled;
    },
    setInitialIntegrations: (
      state,
      action: PayloadAction<{ integrations: IIntegration[] }>
    ) => {
      state.integrations = action.payload.integrations;
    },
    updateIntegration: (
      state,
      action: PayloadAction<{
        i: number;
        newIntegration: updateIntegrationType;
      }>
    ) => {
      const { bio, links, profile, username } = action.payload.newIntegration;

      state[action.payload.i].bio = bio;
      state[action.payload.i].links = links;
      state[action.payload.i].profile = profile;
      state[action.payload.i].username = username;

      // #TODO: Send request to update integration
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendAsyncIntegrationRequest.pending, (state) => {
        // #TODO: add a variable loading, and show loader if loading true
        return state;
      })
      .addCase(sendInitialStateRequest.fulfilled, (state, action) => {
        state.integrations = action.payload.integrations;
        state._id = action.payload._id;
        state.accountType = action.payload.accountType;
      })
      .addCase(sendAsyncIntegrationRequest.rejected, (state, action) => {
        // #TODO: add a variable error, and show error if error exists
        return state;
      })
    }
});

export const selectUser = (state: RootState) => state.user;
export const selectIntegrations = (state: RootState) => state.user.integrations;

export const { toggleIntegration } = userSlice.actions;

export default userSlice.reducer;
