const userRouter = [
    {
        path:'/login',
        name : 'user.login',
        component : () => import("../../views/user/Login.vue")
    },
    {
        path:'/register',
        name : 'user.register',
        component : () => import("../../views/user/Register.vue")
    },
]

export default userRouter;