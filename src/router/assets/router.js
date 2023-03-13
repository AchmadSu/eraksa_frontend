const assetsRouter = [
    {
        path:'/assets',
        name : 'manageAssets',
        component : () => import("../../views/assets/Assets.vue")
    },
    {
        path:'/assets/trash',
        name : 'manageAssets.trash',
        component : () => import("../../views/assets/Trash.vue")
    },
    {
        path:'/assets/create',
        name : 'manageAssets.create',
        component : () => import("../../views/assets/Create.vue")
    },
    {
        path:'/assets/edit',
        name : 'manageAssets.update',
        component : () => import("../../views/assets/Update.vue")
    },
    {
        path:'/menu/assets',
        name : 'menu.assets',
        component : () => import("../../views/assets/Index.vue")
    },
    {
        path:'/assets/details',
        name : 'assets.details',
        component : () => import("../../views/assets/AssetDetails.vue")
    },
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

export default assetsRouter;