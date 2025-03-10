import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Vacations from "@/pages/Vacations.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/vacations', component: Vacations }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;