const placementsRouter = [
    {
        path:'/placements',
        name : 'managePlacements',
        component : () => import("../../views/placements/Placements.vue")
    },
    {
        path:'/placements/trash',
        name : 'managePlacements.trash',
        component : () => import("../../views/placements/Trash.vue")
    },
    {
        path:'/placements/create',
        name : 'managePlacements.create',
        component : () => import("../../views/placements/Create.vue")
    },
    {
        path:'/placements/edit',
        name : 'managePlacements.update',
        component : () => import("../../views/placements/Update.vue")
    },
    {
        path:'/menu/placements',
        name : 'menu.placements',
        component : () => import("../../views/placements/Index.vue")
    },
    // {
    //     path:'/register',
    //     name : 'user.register',
    //     component : () => import("../../views/user/Register.vue")
    // },
    // {
    //     path:'/verification',
    //     name : 'user.otpPage',
    //     component : () => import("../../views/user/OneTimePassword.vue"),
    // },
    // {
    //     path:'/resetPhone',
    //     name : 'user.resetPhone',
    //     component : () => import("../../views/user/ResetPhone.vue"),
    // }
]

export default placementsRouter;