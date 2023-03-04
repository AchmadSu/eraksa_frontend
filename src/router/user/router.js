const userRouter = [
    {
        path:'/login',
        name : 'user.login',
        component : () => import("../../views/user/Login.vue")
    },
    {
        path:'/resetPassword',
        name : 'user.requestResetPassword',
        component : () => import("../../views/user/RequestResetPassword.vue")
    },
    {
        path:'/resetPassword/:data',
        name : 'user.resetPassword',
        component : () => import("../../views/user/ResetPassword.vue")
    },
    {
        path:'/register',
        name : 'user.register',
        component : () => import("../../views/user/Register.vue")
    },
    {
        path:'/verification',
        name : 'user.otpPage',
        component : () => import("../../views/user/OneTimePassword.vue"),
    },
    {
        path:'/resetPhone',
        name : 'user.resetPhone',
        component : () => import("../../views/user/ResetPhone.vue"),
    },
    {
        path:'/users',
        name : 'manageUser',
        component : () => import("../../views/user/User.vue"),
    },
    {
        path:'/users/trash',
        name : 'manageUser.trash',
        component : () => import("../../views/user/Trash.vue"),
    },
    {
        path:'/users/roles',
        name : 'manageUser.roles',
        component : () => import("../../views/user/Roles.vue"),
    }
]

export default userRouter;