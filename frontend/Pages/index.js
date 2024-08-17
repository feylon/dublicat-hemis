import { createRouter, createWebHistory } from "vue-router";
import loginDean from "../src/Dean/login.vue"



const router = createRouter({
  history: createWebHistory(),
  routes: [
   {path : "/dean/login", component : loginDean},
   {path : "/dean", component : ()=>import("../src/Dean/dashtboard.vue"), children :[
    {path : "/dean/editprofil", component : ()=>import('../src/Dean/Editprofil.vue')}
   ]},
    

  ],
});

export default router;
