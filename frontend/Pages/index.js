import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
   {path : "/dean/login", component : ()=>import("../src/Dean/login.vue")},
   {path : "/dean", component : ()=>import("../src/Dean/dashtboard.vue"), children :[
    {path : "/dean/editprofil", component : ()=>import('../src/Dean/Editprofil.vue')}
   ]},
    

  ],
});

export default router;
