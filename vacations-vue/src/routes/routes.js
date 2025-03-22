import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Auth from "@/pages/Auth.vue";
import Vacations from "@/pages/Vacations.vue";
import Admin from "@/pages/Admin.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/auth', component: Auth },
    { path: '/vacations', component: Vacations },
    { path: '/admin', component: Admin }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;