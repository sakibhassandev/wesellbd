"use client";

import { store } from "@/store/index";
import { Provider as ReduxProvider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default StoreProvider;
