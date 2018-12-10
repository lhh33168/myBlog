module.exports = app => {
    const { router, controller } = app;

    // ======================================== 博客系统 ======================================
    
    //笔记分类
    router.get("/admin/blog/noteCategory", controller.admin.blog.noteCategoryController.index);
    router.get("/admin/blog/noteCategory/new", controller.admin.blog.noteCategoryController.new);
    router.post("/admin/blog/noteCategory/add", controller.admin.blog.noteCategoryController.add);
    router.get("/admin/blog/noteCategory/edit", controller.admin.blog.noteCategoryController.edit);
    router.post("/admin/blog/noteCategory/edit", controller.admin.blog.noteCategoryController.update);
    router.get("/admin/blog/noteCategory/del", controller.admin.blog.noteCategoryController.destroy);
    router.get("/admin/blog/noteCategory/list", controller.admin.blog.noteCategoryController.list);
    router.get("/admin/blog/noteCategory/publish", controller.admin.blog.noteCategoryController.publish);
    router.get("/admin/blog/noteCategory/repeal", controller.admin.blog.noteCategoryController.repeal);

    //笔记
    router.get("/admin/blog/note", controller.admin.blog.noteController.index);
    router.get("/admin/blog/note/new", controller.admin.blog.noteController.new);
    router.post("/admin/blog/note/add", controller.admin.blog.noteController.add);
    router.get("/admin/blog/note/edit", controller.admin.blog.noteController.edit);
    router.post("/admin/blog/note/edit", controller.admin.blog.noteController.update);
    router.get("/admin/blog/note/del", controller.admin.blog.noteController.destroy);
    router.get("/admin/blog/note/list", controller.admin.blog.noteController.list);
    router.get("/admin/blog/note/publish", controller.admin.blog.noteController.publish);
    router.get("/admin/blog/note/repeal", controller.admin.blog.noteController.repeal);

    // ======================================== 博客系统门户 ======================================
    router.get("/blog/note/note", controller.blog.noteController.index);
    router.get("/blog/note/details", controller.blog.noteController.details);
    router.get("/blog/note/noteList", controller.blog.noteController.noteList);

    // ======================================== 权限系统 ======================================
    
    //用户管理
    router.get("/admin/authority/users", controller.admin.authority.usersController.index);
    router.get("/admin/authority/users/new", controller.admin.authority.usersController.new);
    router.post("/admin/authority/users/add", controller.admin.authority.usersController.create);
    router.get("/admin/authority/users/edit", controller.admin.authority.usersController.edit);
    router.post("/admin/authority/users/update", controller.admin.authority.usersController.update);
    router.get("/admin/authority/users/del", controller.admin.authority.usersController.destroy); //删除用户
    router.get("/admin/authority/users/enabled", controller.admin.authority.usersController.enabled); //启用用户
    router.get("/admin/authority/users/disable", controller.admin.authority.usersController.disable); //禁用用户
    router.get("/admin/authority/users/pword", controller.admin.authority.usersController.pword); //进入修改密码页面
    router.post("/admin/authority/upPassword", controller.admin.authority.usersController.upPassword); //修改登录账号密码
    //用户授权
    router.get("/admin/authority/users/authority", controller.admin.authority.usersRuleController.authority);
    router.post("/admin/authority/users/authority", controller.admin.authority.usersRuleController.saveAuthority);
    //角色管理
    router.get("/admin/authority/role", controller.admin.authority.roleController.role);
    router.get("/admin/authority/role/new", controller.admin.authority.roleController.new);
    router.post("/admin/authority/role/add", controller.admin.authority.roleController.add);
    router.post("/admin/authority/role/edit", controller.admin.authority.roleController.update);
    router.get("/admin/authority/role/edit", controller.admin.authority.roleController.edit);
    router.get("/admin/authority/role/del", controller.admin.authority.roleController.destroy);
    router.get("/admin/authority/role/enabled", controller.admin.authority.roleController.enabled);
    router.get("/admin/authority/role/disable", controller.admin.authority.roleController.disable);
    //角色授权
    router.get("/admin/authority/role/authority", controller.admin.authority.roleMenuController.authority);
    router.post("/admin/authority/role/authority", controller.admin.authority.roleMenuController.saveAuthority);
    router.get("/admin/authority/rote/getMenuAuthority", controller.admin.authority.roleMenuController.getMenuAuthority);
    //菜单管理
    
    router.get("/admin/authority/getMenu", controller.admin.authority.userOnlineMenuController.getMenu);
    router.get("/admin/authority/menu/export", controller.admin.authority.menuController.export);
    router.get("/admin/authority/menu/download", controller.admin.authority.menuController.download);
    router.post("/admin/authority/menu/import", controller.admin.authority.menuController.import);
    router.get("/admin/authority/setChildrenMenus2", controller.admin.authority.menuController.setChildrenMenus2);
    router.get("/admin/authority/menu", controller.admin.authority.menuController.menu);
    router.get("/admin/authority/menu/new", controller.admin.authority.menuController.new);
    router.post("/admin/authority/menu/add", controller.admin.authority.menuController.add);    //添加菜单
    router.post("/admin/authority/menu/edit", controller.admin.authority.menuController.update2); //修改菜单
    router.get("/admin/authority/menu/edit", controller.admin.authority.menuController.edit);
    router.get("/admin/authority/menu/del", controller.admin.authority.menuController.destroyTree); //删除菜单
    router.get("/admin/authority/menu/enabled", controller.admin.authority.menuController.enabled); //启用菜单
    router.get("/admin/authority/menu/disable", controller.admin.authority.menuController.disable); //禁用菜单
    

    // ======================================== main主板块 ====================================
    //ueditor编辑器
    router.get('/public/lib/ueditor/ue', controller.common.ueditorUploadController.upload);
    router.post('/public/lib/ueditor/ue', controller.common.ueditorUploadController.upload);
    // 切换系统
    router.get("/admin/main/switchsys", controller.admin.main.indexController.switchsys);
    router.post("/main/login", controller.admin.main.indexController.login);
    router.get("/main/login", controller.admin.main.indexController.index);
    router.get("/main/logout", controller.admin.main.indexController.logout);
    router.get("/", controller.blog.noteController.index);
};