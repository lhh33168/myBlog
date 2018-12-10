const Controller = require("../../../base/baseController");

class authorityService extends Controller {

    /**
     * 判断是否有权限
     * @param {string} path
     * @param {string} roleIds
     */
    async accept(path, roleIds) {
        let isAccept = false;

        const exclude = this.app.config.authority.excludes;
        if (-1 != exclude.indexOf(path)) { //如果是已经被排除的path，则视为有权访问
            isAccept = true;
        } else if (roleIds) { //如果没有角色数据，则视为无权访问，如果有角色数据，则进一步判断是否有权访问
            let ids = roleIds.split(',');
            const roles = await this.getCacheRoles();
            if (roles) {
                for (let i = 0, len = ids.length; i < len; i++) {
                    if (roles[ids[i]][path]) {
                        isAccept = true;
                        break;
                    }
                }
            }
        }

        return isAccept;
    }

    /**
     * 获取缓存中的角色数据
     */
    async getCacheRoles() {
        let roles = await this.app.cache.get('roles');
        if (!roles) {
            roles = {};
            let roleResult = await this.ctx.service.admin.authority.dao.authorityDao.getRoles();

            if (roleResult && roleResult.length > 0) {
                for (let i = 0, len = roleResult.length; i < len; i++) {
                    let roleId = roleResult[i].id;
                    let authority = {};

                    let authorityResult = await this.ctx.service.admin.authority.dao.authorityDao.getAuthoritys(roleId);
                    if (authorityResult && authorityResult.length > 0) {
                        for (let n = 0, authLen = authorityResult.length; n < authLen; n++) {
                            authority[authorityResult[n].url] = true;

                            let link_urls = authorityResult[n].link_urls;
                            if (link_urls) { //判断是否有关联的URL，若有，则追加关联URL
                                let link_urls_array = link_urls.split(',');
                                for (let x = 0, urlsLength = link_urls_array.length; x < urlsLength; x++) {
                                    authority[link_urls_array[x]] = true;
                                }
                            }
                        }
                    }
                    roles[roleId] = authority;
                }
            }

            await this.app.cache.set('roles', roles, 0); //永不过期
        }
        return roles;
    }
    /**
     * 清理角色缓存
     */
    async clearCacheRoles() {
        await this.app.cache.del('roles');
    }
}
module.exports = authorityService;
