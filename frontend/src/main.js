import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import '@/app.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEdit, faTrash,faCheck, faTimes);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);  // Register the component here

app.config.productionTip = false;
app.provide('$http', axios);

app.use(router).mount('#app');