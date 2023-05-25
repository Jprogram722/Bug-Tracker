import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// imports tailwind styles
import "./assets/tailwind.css"

// import store
import store from './stores/index';

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');

