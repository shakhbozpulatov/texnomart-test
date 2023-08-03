import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

export default function definePlugins(app) {
  app.use(createPinia());
  app.use(ElementPlus);
}
