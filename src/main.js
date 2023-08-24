import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import storage from './storage';
import cookies from 'vue-cookies';

const app = createApp(App);

app.use(router);
app.use(storage);
app.use(cookies);

app.mount('#app');
