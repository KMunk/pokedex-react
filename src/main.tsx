import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
