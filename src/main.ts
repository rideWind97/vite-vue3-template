import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import { printBuildInfo } from "./utils/buildInfo";
import "./style.css";

// 输出构建版本信息到控制台
printBuildInfo();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
