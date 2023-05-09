import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../pages/Dashboard.vue";
import Register from "../pages/Register.vue";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Error404 from "../pages/Error404.vue";
import Error403 from "../pages/Error403.vue";
import AdminLogin from "../pages/Login/AdminLogin.vue";


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
    name: "Login",
    component: AdminLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta:{
          breadcrumb:[
            {
              display_name: 'Dashboard',
              route_name: 'Dashboard',
              active: true
            }
          ]
        }
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});


export default router;
