import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
   {path : "/dean/login", component : ()=>import("../src/Dean/login.vue")} 
  ],
});

export default router;
