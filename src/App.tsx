import React, { Suspense, useState, useLayoutEffect } from "react";
import { createBrowserHistory } from "history";
import AuthProvider from "./auth/contexts/AuthProvider";
import RoutesApp from "./routes";
import { Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import StyleGlobal from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1 * 60 * 60 * 1000, // cache for 1 day
      retry: false,
    },
  },
});

interface CustomRouterInterface {
  history: any;
  children: any;
}
const CustomRouter: React.FC<CustomRouterInterface> = ({
  history,
  ...props
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomRouter history={history}>
        <Suspense fallback={<div>Loading....</div>}>
          <StyleGlobal />
          <AuthProvider>
            <RoutesApp />
          </AuthProvider>
        </Suspense>
      </CustomRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
