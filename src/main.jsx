import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();
import App from "./App.jsx";
import "./index.css";
import { SubscriptionProvider } from "./hooks/SubscriptionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
