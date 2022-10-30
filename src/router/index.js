import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path:'/',
        name : 'user.index',
        component : () => import("../views/user/Index.vue")
    },
    {
        path:'/login',
        name : 'user.create',
        component : () => import("../views/user/Login.vue")
    },
    {
        path:'/edit/:id',
        name : 'transaction.index',
        component : () => import("../views/transaction/Edit.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;