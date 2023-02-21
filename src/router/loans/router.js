const loansRouter = [
    {
        path:'/loans/create',
        name : 'loans.create',
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
    {
        path:'/loans/edit',
        name : 'loans.update',
        component : () => import("../../views/loans/Update.vue")
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

export default loansRouter;