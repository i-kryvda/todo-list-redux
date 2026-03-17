import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";
import type { PersistConfig } from "redux-persist";
import type { RootState } from "./rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
