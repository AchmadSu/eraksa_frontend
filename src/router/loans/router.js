const loansRouter = [
    {
        path:'/loans/create',
        name : 'createLoans',
        component : () => import("../../views/loans/Create.vue")
    },
    // {
    //     path:'/manage/assets/trash',
    //     name : 'manageAssets.trash',
    //     component : () => import("../../views/assets/Trash.vue")
    // },
    // {
    //     path:'/manage/assets/create',
    //     name : 'manageAssets.create',
    //     component : () => import("../../views/assets/Create.vue")
    // },
    // {
    //     path:'/manage/assets/edit',
    //     name : 'manageAssets.update',
    //     component : () => import("../../views/assets/Update.vue")
    // },
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

export default loansRouter;