const Controller = require("../../../base/baseController");

class menuService extends Controller {
  get dao() {
    return this.ctx.service.admin.authority.dao.menuDao;
  }

  /**
   * 获取菜单
   * @param {*} syscode
   */
  async getMenu(syscode) {
    let menus = await this.getCacheMenus(syscode, this.user.id);
    if (!menus) {
      menus = await this.getDbMenus(syscode, this.user.id);
      await this.setCacheMenus(syscode, this.user.id, menus);
    } else {
      //更新缓存的时间
      let updateTime = await this.app.cache.get("updateMenusTime");
      let setTime = await this.app.cache.get("setTime");
      if (updateTime) {
        if (this.ctx.helper.compareDate(setTime, updateTime)) {
          menus = await this.getDbMenus(syscode, this.user.id);
          await this.setCacheMenus(syscode, this.user.id, menus);
        }
      }
    }
    return this.st.success("", menus);
  }
  /**
   * 从缓存中获取菜单数据
   * @param {*} syscode
   * @param {*} userid 如果id是1，则是超级管理员
   */
  async getCacheMenus(syscode, userid) {
    let menus;
    if (1 == userid) {
      menus = await this.app.cache.get(`menus-root-${syscode}`);
    } else {
      menus = await this.app.cache.get(`menus-${syscode}-${userid}`);
    }
    return menus;
  }
  /**
   * 从数据库中获取菜单数据
   * @param {*} syscode
   * @param {*} userid
   */
  async getDbMenus(syscode, userid) {
    let menus;
    if (1 == userid) {
      menus = await this.dao.select({
        parent_id: 0,
        status: 1,
        type: 1,
        syscode: syscode
      });
      await this.setMenuChildren(menus, syscode);
    } else {
      menus = await this.dao.getUserMenu({
        id: this.user.id,
        parentId: 0,
        syscode: syscode
      });
      await this.setUserMenuChildren(menus, syscode);
    }
    return menus;
  }
  /**
   * 将菜单数据放入缓存中
   * @param {*} syscode
   * @param {*} userid
   * @param {*} menus
   */
  async setCacheMenus(syscode, userid, menus) {
    if (1 == userid) {
      await this.app.cache.set(`menus-root-${syscode}`, menus, 600);
    } else {
      await this.app.cache.set(`menus-${syscode}-${userid}`, menus, 600);
    }
    await this.app.cache.set(`setTime`, new Date());
  }

  /**
   * 设置子菜单
   * @param {*} menus
   */
  async setMenuChildren(menus, syscode) {
    for (let i = 0, len = menus.length; i < len; i++) {
      let children = await this.dao.select({
        parent_id: menus[i].id,
        status: 1,
        type: 1,
        syscode: syscode
      });
      await this.setMenuChildren(children, syscode);
      menus[i].children = children;
    }
  }
  /**
   * 设置用户子菜单
   * @param {*} menus
   */
  async setUserMenuChildren(menus, syscode) {
    for (let i = 0, len = menus.length; i < len; i++) {
      let children = await this.dao.getUserMenu({
        id: this.user.id,
        parentId: menus[i].id,
        syscode: syscode
      });
      await this.setUserMenuChildren(children, syscode);
      menus[i].children = children;
    }
  }
}
module.exports = menuService;
