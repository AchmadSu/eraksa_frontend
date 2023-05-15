import { createRouter, createWebHistory } from 'vue-router'
// import studyProgramRouter from './studyProgram/router';
import placementsRouter from './placements/router';
import userRouter from './user/router';
import categoryAssetsRouter from './categoryAssets/router';
// import workshopsRouter from './workshops/router';
import assetsRouter from './assets/router';
import loansRouter from './loans/router';

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

// Object.keys(studyProgramRouter).forEach((item) => {
//     routes.push(studyProgramRouter[item]);
// })

Object.keys(placementsRouter).forEach((item) => {
    routes.push(placementsRouter[item]);
})

Object.keys(categoryAssetsRouter).forEach((item) => {
    routes.push(categoryAssetsRouter[item]);
})

    // Object.keys(workshopsRouter).forEach((item) => {
    //     routes.push(workshopsRouter[item]);
    // })

Object.keys(assetsRouter).forEach((item) => {
    routes.push(assetsRouter[item]);
})

Object.keys(loansRouter).forEach((item) => {
    routes.push(loansRouter[item]);
})

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;