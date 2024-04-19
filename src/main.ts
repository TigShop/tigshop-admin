import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./permission";
import { regGlobalComponets } from "@/components/regGlobal";

const app = createApp(App);

regGlobalComponets(app);

const pinia = createPinia();
import piniaPersist from "pinia-plugin-persist";
pinia.use(piniaPersist);
app.use(pinia);

// import Antd from 'ant-design-vue';
// app.use(Antd)
// import 'default-passive-events'

import ElementPlus from "element-plus";
app.use(ElementPlus);
import "./style/css/element-variables.scss";
import "./style/global.less"; // global style
import "./style/css/m.base.less";

app.use(router);
app.mount("#app");
