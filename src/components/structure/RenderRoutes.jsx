import { Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import { UnauthorizedPage } from "../pages/403";

export const RenderRoutes = () => {
  const { user } = AuthData();
  return (
    <Routes>
      {nav.map((route, index) => {
        if (route.isPrivate && user.isAuthenticated) {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        } else if (!route.isPrivate) {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        } else if (route.isPrivate && !route.isAuthenticated) {
          return (
            <Route
              key={index}
              path={route.path}
              element={<UnauthorizedPage />}
            />
          );
        }
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
};
