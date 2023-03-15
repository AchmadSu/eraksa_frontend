const workshopsRouter = [
    {
        path:'/workshops',
        name : 'manageWorkshops',
        component : () => import("../../views/workshops/Workshops.vue")
    },
    {
        path:'/workshops/trash',
        name : 'manageWorkshops.trash',
        component : () => import("../../views/workshops/Trash.vue")
    },
    {
        path:'/workshops/create',
        name : 'manageWorkshops.create',
        component : () => import("../../views/workshops/Create.vue")
    },
    {
        path:'/workshops/edit',
        name : 'manageWorkshops.update',
        component : () => import("../../views/workshops/Update.vue")
    },
]

export default workshopsRouter;