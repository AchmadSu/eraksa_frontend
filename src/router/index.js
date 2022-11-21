import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    /** USER ROUTE */
    {
        path:'/',
        name : 'user.index',
        component : () => import("../views/user/Index.vue")
    },
    {
        path:'/login',
        name : 'user.login',
        component : () => import("../views/user/Login.vue")
    },
    {
        path:'/resetPassword',
        name : 'user.requestResetPassword',
        component : () => import("../views/user/RequestResetPassword.vue")
    },
    {
        path:'/resetPassword/:data',
        name : 'user.resetPassword',
        component : () => import("../views/user/ResetPassword.vue")
    },
    {
        path:'/register',
        name : 'user.register',
        component : () => import("../views/user/Register.vue")
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