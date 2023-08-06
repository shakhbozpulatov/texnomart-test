import { createWebHistory, createRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/LDefault.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Home",
        component: () => import("@/pages/PHomeView.vue"),
      },
      {
        path: "/product/:id",
        name: "Product",
        component: () => import("@/pages/Product/PProductView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/LoginView.vue"),
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
  const authStore = useAuthStore();
  const loggedIn = computed(() => authStore.loggedIn);
  if (["404", "403", "500"].includes((to.name || "").toString())) {
    next();
  }
  if (token && !loggedIn.value) {
    await authStore.fetchUser();
  }

  // console.log('role checker: ', checkRole.value, to.meta, user.value)
  // if(!checkRole.value) {
  //   return next({ name: '404' })
  // }
  if (to.name === "Login" && loggedIn.value) {
    return next({ name: "Dashboard" });
  } else next();
  next();
});

export default router;
