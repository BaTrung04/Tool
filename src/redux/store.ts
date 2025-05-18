import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socket"], // Không lưu trữ socket trong redux-persist
};

// rootReducer với các reducer được kết hợp
const rootReducer = combineReducers({});

// Áp dụng persistReducer vào rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với middleware, bỏ qua các action không serializable của redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Khai báo kiểu cho RootState từ rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Khai báo kiểu cho AppDispatch từ store
export type AppDispatch = typeof store.dispatch;

// Tạo persistor để quản lý trạng thái được lưu trữ
export const persistor = persistStore(store);
