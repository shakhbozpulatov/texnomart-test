import { ref, computed } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axiosInstance from "@/axios";

export function useAuthStore() {
  return defineStore("auth", {
    state: () => ({}),
    actions: {
      fetchUser() {
        axiosInstance
          .get(`/get_me`)
          .then((res) => {
            this.user = res.data;
            this.loggedIn = true;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      logout() {
        localStorage.removeItem("token");
        this.user = {};
        this.loggedIn = false;
        router.push({ name: "Login" });
      },
    },
  })();
}
