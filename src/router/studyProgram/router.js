const studyProgramRouter = [
    {
        path:'/studyPrograms',
        name : 'manageStudyPrograms',
        component : () => import("../../views/studyPrograms/StudyProgram.vue")
    },
    {
        path:'/studyPrograms/trash',
        name : 'manageStudyPrograms.trash',
        component : () => import("../../views/studyPrograms/Trash.vue")
    },
    {
        path:'/studyPrograms/create',
        name : 'manageStudyPrograms.create',
        component : () => import("../../views/studyPrograms/Create.vue")
    },
    {
        path:'/studyPrograms/edit',
        name : 'manageStudyPrograms.update',
        component : () => import("../../views/studyPrograms/Update.vue")
    },
    {
        path:'/menu/studyPrograms',
        name : 'menu.studyPrograms',
        component : () => import("../../views/studyPrograms/Index.vue")
    },
]

export default studyProgramRouter;