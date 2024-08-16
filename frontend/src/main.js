import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from "naive-ui"
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import router from '../Pages';


const  app = createApp(App);
app.use(naive);
app.use(PrimeVue, {
    unstyled: true
});

app.component('Button', Button);

app.use(router)
app.mount('#app')
