const categoryAssetsRouter = [
    {
        path:'/categoryAssets',
        name : 'manageCategoryAssets',
        component : () => import("../../views/categoryAssets/CategoryAssets.vue")
    },
    {
        path:'/categoryAssets/trash',
        name : 'manageCategoryAssets.trash',
        component : () => import("../../views/categoryAssets/Trash.vue")
    },
    {
        path:'/categoryAssets/create',
        name : 'manageCategoryAssets.create',
        component : () => import("../../views/categoryAssets/Create.vue")
    },
    {
        path:'/categoryAssets/edit',
        name : 'manageCategoryAssets.update',
        component : () => import("../../views/categoryAssets/Update.vue")
    },
    {
        path:'/menu/categories',
        name : 'menu.categories',
        component : () => import("../../views/categoryAssets/Index.vue")
    },
]

export default categoryAssetsRouter;