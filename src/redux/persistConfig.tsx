import storage from "redux-persist/lib/storage"; // Sử dụng storage mặc định (localStorage)

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Chỉ định slice nào sẽ được persist
};

export default persistConfig;
