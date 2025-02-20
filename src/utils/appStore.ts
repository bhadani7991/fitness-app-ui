import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import goalReducer from "./goalSlice";
import goalProgressReducer from "./goalProgressSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
    goalProgress: goalProgressReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export default appStore;
