import { createRouter, createWebHistory } from 'vue-router'
import studyProgramRouter from './studyProgram/router';
import userRouter from './user/router';

const routes = [
    {
        path:'/',
        name : 'dashboard',
        component : () => import("../views/Dashboard.vue")
    },
    {
        path:'/:catchAll(.*)',
        name : '404',
        component : () => import("../views/NotFound.vue")
    },
];

Object.keys(userRouter).forEach((item) => {
    routes.push(userRouter[item]);
})

Object.keys(studyProgramRouter).forEach((item) => {
    routes.push(studyProgramRouter[item]);
})

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;