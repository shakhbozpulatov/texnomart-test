import { createWebHistory, createRouter } from "vue-router";
import { computed } from "vue";
// import { useAuthStore } from "@/stores/auth.js";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/pages/PHomeView.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/pages/PError.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/pages/PError.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/PError.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("token");
  if (["404", "403", "500"].includes((to.name || "").toString())) {
    next();
  }
  // if (token && !loggedIn.value) {
  //   // await authStore.fetchUser();
  // }

  // console.log('role checker: ', checkRole.value, to.meta, user.value)
  // if(!checkRole.value) {
  //   return next({ name: '404' })
  // }
  // if (to.name === "Login" && loggedIn.value) {
  //   return next({ name: "Dashboard" });
  // } else next();
  next();
});

export default router;
