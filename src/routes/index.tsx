import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes-base";
import PrivateRoute from "../core/components/PrivateRoute";

const RoutesApp = () => {
  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          return (
            <>
              {route?.private ? (
                <Route
                  path={route.path}
                  element={
                    <PrivateRoute roles={route?.roles}>
                      <route.element />
                    </PrivateRoute>
                  }
                  key={index}
                />
              ) : (
                <Route
                  path={route.path}
                  element={<route.element />}
                  key={index}
                />
              )}
              {!!route?.subPath &&
                route?.subPath?.map((p: any, i: number) => (
                  <>
                    {p?.private ? (
                      <Route
                        path={`${route.path}${p?.path}`}
                        element={
                          <PrivateRoute roles={p?.roles}>
                            <p.element />
                          </PrivateRoute>
                        }
                        key={index * i}
                      />
                    ) : (
                      <Route
                        path={`${route.path}${p?.path}`}
                        element={<p.element />}
                        key={index * i}
                      />
                    )}
                  </>
                ))}
            </>
          );
        })}
      </Routes>
    </>
  );
};

export default RoutesApp;
