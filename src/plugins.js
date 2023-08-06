import { createPinia } from "pinia";
import { createI18n, useI18n } from "vue-i18n";
import { languages } from "./assets/lang/i18n.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  fallbackLocale: "uz",
  locale: localStorage.getItem("locale") || "uz",
  allowComposition: true,
  messages,
});

export default function definePlugins(app) {
  app.use(createPinia());
  app.use(i18n);
  app.use(ElementPlus);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  return app;
}
