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
    {
        path:'/loans/request',
        name : 'manageLoans.request',
        component : () => import("../../views/loans/Request.vue")
    },
    {
        path:'/loans/confirmation',
        name : 'manageLoans.confirmation',
        component : () => import("../../views/loans/Confirmation.vue")
    },
    {
        path:'/loans/accept',
        name : 'manageLoans.accept',
        component : () => import("../../views/loans/Accept.vue")
    },
    {
        path:'/loans/done',
        name : 'manageLoans.done',
        component : () => import("../../views/loans/Done.vue")
    },
    {
        path:'/loans/reject',
        name : 'manageLoans.reject',
        component : () => import("../../views/loans/Reject.vue")
    },
    {
        path:'/loans/details',
        name : 'manageLoans.details',
        component : () => import("../../views/loans/LoanDetails.vue")
    },
    {
        path:'/loans/returnDetails',
        name : 'manageLoans.returnDetails',
        component : () => import("../../views/loans/ReturnDetails.vue")
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