import { createSelector } from "reselect";
import { UserData } from "../../utils/firebase/firebase.utils";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user): UserData | null => user.currentUser
);
