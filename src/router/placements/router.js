const placementsRouter = [
    {
        path:'/placements',
        name : 'managePlacements',
        component : () => import("../../views/placements/Placements.vue")
    },
    {
        path:'/placements/trash',
        name : 'managePlacements.trash',
        component : () => import("../../views/placements/Trash.vue")
    },
    {
        path:'/placements/create',
        name : 'managePlacements.create',
        component : () => import("../../views/placements/Create.vue")
    },
    {
        path:'/placements/edit',
        name : 'managePlacements.update',
        component : () => import("../../views/placements/Update.vue")
    },
    {
        path:'/menu/placements',
        name : 'menu.placements',
        component : () => import("../../views/placements/Index.vue")
    },
]

export default placementsRouter;