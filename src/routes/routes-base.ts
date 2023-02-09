import React from "react";
const Login = React.lazy(() => import("../auth/pages/Login"));
import ListClass from "page/ListClass";
import NotFound from "page/NotFound";
import ManagerUsers from "page/ManagerUsers";

const routes: any[] = [
  {
    path: "/login",
    element: Login,
    private: false,
  },
  {
    path: "/manager-users",
    name: "Quản lý users",
    element: ManagerUsers,
    private: false,
    // roles: [SUPER_ADMIN, ADMIN],
  },
  {
    path: "/",
    name: "Danh sách class",
    element: ListClass,
    private: false,
    // roles: [SUPER_ADMIN, ADMIN],
  },
  // {
  //   path: "/manager-order",
  //   name: "Quản lý order",
  //   element: ManagerOrder,
  //   private: true,
  //   roles: [SUPER_ADMIN, ADMIN, LEADER, HRM, HR],
  //   subPath: [
  //     {
  //       path: "/detail-order/:id",
  //       element: DetailOrder,
  //       private: true,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: NotFound,
    private: false,
  },
];

export default routes;
