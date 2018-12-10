//检查用户登录状态
module.exports = () => {
    return async function checkLogin(ctx, next) {
        const path = ctx.path;

        if (path.indexOf("/admin") >= 0) { //访问的是/admin开头的网址，检查到有，就会返回第几个字开始（数字），无论第几个字开始，都是大于0，如果没有则返回-1，-1是小于0

            if (!ctx.session || !ctx.session.user) { //并且 检查到 ( 没有用户session  或者  用户session里面没有用户登录信息 )
                await ctx.render('/admin/main/login.tpl', { status: { code: 1, message: '请先登录！' } });
                return;
            } else {
                if (1 != ctx.session.user.id) { //如果非超级管理员
                    let isAccept = await ctx.service.admin.authority.authorityService.accept(path, ctx.session.user.role_ids);
                    console.log(`当前访问: ${path} - isAccept: ${isAccept}`);

                    if (!isAccept) {
                        ctx.body = { code: 1, message: '很抱歉，您没有权限！', data: path };
                        return;
                    } else {
                        await next();
                        return;
                    }
                } else {
                    await next();
                    return;
                }
            }
        } else {
            await next();
            return;
        }
    };
};