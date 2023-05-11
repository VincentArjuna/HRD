import { createRouter, createWebHistory } from "vue-router";

//Global
import Dashboard from "../pages/Dashboard.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
//Status Code
import Error404 from "../pages/Error404.vue";
import Error403 from "../pages/Error403.vue";

import Register from "../pages/Register.vue";
import AdminLogin from "../pages/Login/AdminLogin.vue";
import EmployeeIndex from "../pages/Employee/EmployeeIndex.vue";
const routes = [
  {
    path: "/forbidden",
    name: "403",
    component: Error403,
  },
  {
    path: "/oops",
    name: "404",
    component: Error404,
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          breadcrumb: [
            {
              display_name: "Dashboard",
              route_name: "Dashboard",
              active: true,
            },
          ],
        },
      },
      {
        path: "/employee",
        name: "EmployeeIndex",
        component: EmployeeIndex,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "AdminLogin" || to.name === "Register") {
    next();
  } else {
    if (localStorage.getItem("access_token")) {
      next();
    } else {
      next({ name: "AdminLogin" });
    }
  }
});

export default router;
