const categoryAssetsRouter = [
    {
        path:'/categoryAssets',
        name : 'manageCategoryAssets',
        component : () => import("../../views/categoryAssets/CategoryAssets.vue")
    },
    {
        path:'/categoryAssets/trash',
        name : 'manageCategoryAssets.trash',
        component : () => import("../../views/categoryAssets/Trash.vue")
    },
    {
        path:'/categoryAssets/create',
        name : 'manageCategoryAssets.create',
        component : () => import("../../views/categoryAssets/Create.vue")
    },
    {
        path:'/categoryAssets/edit',
        name : 'manageCategoryAssets.update',
        component : () => import("../../views/categoryAssets/Update.vue")
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

export default categoryAssetsRouter;