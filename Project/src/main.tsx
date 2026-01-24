import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
