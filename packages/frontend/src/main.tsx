import { ChakraProvider } from "@chakra-ui/react";
import Hls from "hls.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./api/contexts/auth.context";
import { theme } from "./utils/custom-theme";
import { routes } from "./utils/routes";
import { initAxios } from "./utils/axios";
import { HelmetProvider } from "react-helmet-async";

if (Hls.isSupported()) {
  console.log("Hls supported");
}

const router = createBrowserRouter(routes);
export const queryClient = new QueryClient();
initAxios();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
