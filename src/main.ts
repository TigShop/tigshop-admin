import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './permission'
import { regGlobalComponets } from '@/components/regGlobal';
import './style/global.less' // global style
import './style/css/m.base.less'

// import 'element-plus/dist/index.css'
import './style/css/element-variables.scss';


const app = createApp(App)


regGlobalComponets(app);

const pinia = createPinia()
import piniaPersist from 'pinia-plugin-persist'
pinia.use(piniaPersist)
app.use(pinia)

// import Antd from 'ant-design-vue';
// app.use(Antd)
// import 'default-passive-events'

import ElementPlus from 'element-plus'
app.use(ElementPlus)

app.use(router)
app.mount('#app')
