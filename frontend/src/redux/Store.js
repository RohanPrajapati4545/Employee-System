import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./AuthSlice"
import wishlistReducer from "./WislistSlice";
import cartReducer from "./CartSlice";
export const store = configureStore({

    reducer: {

        auth: authReducer,
        wishlist: wishlistReducer,
            cart: cartReducer,
    }
})