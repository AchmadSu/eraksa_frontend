const placementsRouter = [
    {
        path:'/manage/placements',
        name : 'managePlacements',
        component : () => import("../../views/placements/Placements.vue")
    },
    {
        path:'/manage/placements/trash',
        name : 'managePlacements.trash',
        component : () => import("../../views/placements/Trash.vue")
    },
    {
        path:'/manage/placements/create',
        name : 'managePlacements.create',
        component : () => import("../../views/placements/Create.vue")
    },
    {
        path:'/manage/placements/edit',
        name : 'managePlacements.update',
        component : () => import("../../views/placements/Update.vue")
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