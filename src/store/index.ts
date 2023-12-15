import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./slices/app"
import userReducer from "./slices/user"
import companyReducer from "./slices/company"
import locationReducer from "./slices/location"
import disabledLocationMenuCategoryReducer from "./slices/disabledLocationMenuCategory"
import menuCategoryReducer from "./slices/menuCategory"
import menuReducer from "./slices/menu"
import menuCategoryMenuReducer from "./slices/menuCategoryMenu"
import addonCategoryReducer from "./slices/addonCategory"
import menuAddonCategoryReducer from "./slices/menuAddonCategory"
import addonReducer from "./slices/addon"
import tableReducer from "./slices/table"

export const store = configureStore({
  reducer: {
    app : appReducer,
    user : userReducer,
    company : companyReducer,
    location : locationReducer,
    disabledLocationMenuCategory : disabledLocationMenuCategoryReducer,
    menuCategory : menuCategoryReducer,
    menu : menuReducer,
    menuCategoryMenu : menuCategoryMenuReducer,
    addonCategory : addonCategoryReducer,
    menuAddonCategory : menuAddonCategoryReducer,
    addon : addonReducer,
    table : tableReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch