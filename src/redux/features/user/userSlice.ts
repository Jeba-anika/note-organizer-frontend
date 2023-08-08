import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserCredential {
  email: string | null;
  id: string | null;
}

const initialState: IUserCredential = {
  email: null,
  id: null,
};
interface ILoginResponse {
  email: string;
  accessToken: string;
  _id: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      state.email = action?.payload?.email;
      state.id = action.payload._id;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("id", action.payload._id);
    },
    removeUser: (state) => {
      state.email = null;
      state.id = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
