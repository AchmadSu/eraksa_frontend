const studyProgramRouter = [
    {
        path:'/manage/studyPrograms',
        name : 'manageStudyPrograms',
        component : () => import("../../views/studyPrograms/StudyProgram.vue")
    },
    {
        path:'/manage/studyPrograms/trash',
        name : 'manageStudyPrograms.trash',
        component : () => import("../../views/studyPrograms/Trash.vue")
    },
    {
        path:'/manage/studyPrograms/create',
        name : 'manageStudyPrograms.create',
        component : () => import("../../views/studyPrograms/Create.vue")
    },
    {
        path:'/manage/studyPrograms/edit',
        name : 'manageStudyPrograms.update',
        component : () => import("../../views/studyPrograms/Update.vue")
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

export default studyProgramRouter;