import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


import router from './router'

createApp(App).use(router).mount('#app')
