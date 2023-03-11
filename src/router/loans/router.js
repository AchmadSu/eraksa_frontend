const loansRouter = [
    {
        path:'/loans/create',
        name : 'loans.create',
        component : () => import("../../views/loans/Create.vue")
    },
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
    {
        path:'/loans/myHistory',
        name : 'loans.myHistory',
        component : () => import("../../views/loans/myHistory/Index.vue")
    },
    {
        path:'/loans/myRequest',
        name : 'myLoans.request',
        component : () => import("../../views/loans/myHistory/Request.vue")
    },
    {
        path:'/loans/myActive',
        name : 'myLoans.active',
        component : () => import("../../views/loans/myHistory/Accept.vue")
    },
    {
        path:'/loans/myReject',
        name : 'myLoans.reject',
        component : () => import("../../views/loans/myHistory/Reject.vue")
    },
    {
        path:'/loans/myDone',
        name : 'myLoans.done',
        component : () => import("../../views/loans/myHistory/Done.vue")
    },
    {
        path:'/loans/myDetails',
        name : 'myLoans.details',
        component : () => import("../../views/loans/myHistory/LoanDetails.vue")
    },
    {
        path:'/loans/myReturnDetails',
        name : 'myLoans.returnDetails',
        component : () => import("../../views/loans/myHistory/ReturnDetails.vue")
    },
    {
        path:'/test',
        name : 'myLoans.returnDetails',
        component : () => import("../../views/loans/Letter.vue")
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

export default loansRouter;