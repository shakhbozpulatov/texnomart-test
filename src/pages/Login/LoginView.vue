<template>
  <div class="container">
    <div class="login">
      <h1 class="text-dark text-2xl font-bold text-center mb-8">Kirish</h1>

      <transition name="fade" mode="out-in">
        <form autocomplete="off" class="mt-6">
          <div>
            <label for="username"
              ><b> {{ $t("username") }} </b></label
            >
            <el-input
              class="mt-2"
              type="text"
              v-model="form.username"
              placeholder="Username"
              :class="{ '!border-red-700': v$.username.$error }"
              size="large"
            >
            </el-input>
          </div>
          <div class="mt-2">
            <label for="password"
              ><b> {{ $t("password") }} </b></label
            >
            <el-input
              type="password"
              class="mt-2"
              show-password
              v-model="form.password"
              :placeholder="$t('enter_password')"
              :class="{ '!border-red-700': v$.password.$error }"
              size="large"
              autocomplete="new-password"
            />
          </div>
        </form>
      </transition>
      <el-button
        @click.prevent="loginBtn"
        type="warning"
        size="large"
        class="w-full mt-4"
        v-bind="{ loading }"
      >
        <span v-show="!loading">
          {{ $t("login") }}
        </span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from "@/axios.js";
import router from "../../router/index.js";
import { ref, reactive, watch } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import axios from "axios";

const { t } = useI18n();

const authStore = useAuthStore();
const activeTab = ref("teacher");
const loading = ref(false);
const form = ref({
  username: "",
  password: "",
});
const rules = {
  username: { required }, // Matches state.firstName
  password: { required }, // Matches state.lastName
};
const v$ = useVuelidate(rules, form);
// const submitUrls = reactive({
//   student: "/login/student",
//   teacher: "/login/teacher",
// });
const loginBtn = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    loading.value = true;
    let data = {};
    data.username = form.value.username;
    data.password = form.value.password;
    axios
      .post("https://dummyjson.com/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res?.data.token);
        localStorage.setItem("ID", res?.data.id);
        toast.success(t("successfully_logged_in"));
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
    // return new Promise((resolve, reject) => {
    //   fetch("https://dummyjson.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ ...data }),
    //   })
    //     .then(async (res) => {
    //       console.log(res);
    //       // localStorage.setItem("token", res?.data.token);
    //       // await authStore.fetchUser();
    //       toast.success(t("successfully_logged_in"));
    //       setTimeout(() => {
    //         router.push({ name: "Home" });
    //       }, 500);
    //       resolve(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.error(err?.response?.data?.detail || t("error_in_login"));
    //       reject(err);
    //     });
    //   // axiosInstance
    //   //   .post(submitUrls[activeTab.value], {
    //   //     ...data,
    //   //   })
    //   //   .then(async (res) => {
    //   //     localStorage.setItem("token", res?.data.jwt);
    //   //     await authStore.fetchUser();
    //   //     toast.success(t("successfully_logged_in"));
    //   //     setTimeout(() => {
    //   //       router.push({ name: "Dashboard" });
    //   //     }, 500);
    //   //     resolve(res);
    //   //   })
    //   //   .catch((err) => {
    //   //     console.log(err);
    //   //     toast.error(err?.response?.data?.detail || t("error_in_login"));
    //   //     reject(err);
    //   //   })
    //   //   .finally(() => {
    //   //     loading.value = false;
    //   //   });
    // });
  }
};

watch(
  () => activeTab.value,
  (e) => {
    authStore.loginTab = e;
  }
);
</script>

<style lang="scss" scoped>
body {
  background-color: #f3f3f3;
  font-family: Arial, sans-serif;
}

.login {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
