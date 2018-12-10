-- ----------------------------
-- Records of auth_menu
-- ----------------------------
INSERT INTO `auth_menu` VALUES ('13', '1', '账号管理', '/admin/authority/users', null, '1', '0', '', '1', '1', '10', '', '0', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-08-24 17:29:28', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-10-16 20:57:08');
INSERT INTO `auth_menu` VALUES ('14', '1', '角色管理', '/admin/authority/role', null, '1', '0', '', '1', '1', '20', '', '0', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-08-24 17:29:50', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-10-17 16:59:51');
INSERT INTO `auth_menu` VALUES ('15', '1', '菜单管理', '/admin/authority/menu', null, '1', '0', '', '1', '1', '30', '', '0', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-08-24 17:30:07', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-08-24 17:30:07');
INSERT INTO `auth_menu` VALUES ('39', '1', '发布笔记', '/admin/blog/note', '', '1', '0', '', '1', '1', '1', '', '0', '1', '2018-10-22 10:30:18', '1', '2018-12-06 18:26:42');
INSERT INTO `auth_menu` VALUES ('40', '1', '查询', '/admin/authority/menu', '/admin/authority/setChildrenMenus2', '2', '15', '15', '2', '1', '10', '', '0', '1', '2018-10-22 16:44:57', '1', '2018-10-29 15:14:28');
INSERT INTO `auth_menu` VALUES ('55', '1', '新增', '/admin/blog/note/new', '/admin/blog/note/add', '2', '39', '39', '2', '1', '10', '', '0', '1', '2018-10-27 10:59:42', '1', '2018-12-06 18:28:25');
INSERT INTO `auth_menu` VALUES ('59', '1', '编辑', '/admin/blog/note/edit', '', '2', '39', '39', '2', '1', '10', '', '0', '1', '2018-10-29 14:11:42', '1', '2018-12-06 18:28:32');
INSERT INTO `auth_menu` VALUES ('60', '1', '删除', '/admin/blog/note/del', '', '2', '39', '39', '2', '1', '30', '', '0', '1', '2018-10-29 14:12:33', '1', '2018-12-06 18:28:38');
INSERT INTO `auth_menu` VALUES ('61', '1', '新增', '/admin/authority/users/new', '/admin/authority/users/add', '2', '13', '13', '2', '1', '10', '', '0', '1', '2018-10-29 14:13:44', '1', '2018-10-29 14:16:11');
INSERT INTO `auth_menu` VALUES ('63', '1', '授权', '/admin/authority/users/authority', '', '2', '13', '13', '2', '1', '20', '', '0', '1', '2018-10-29 14:14:43', '1', '2018-10-29 14:14:43');
INSERT INTO `auth_menu` VALUES ('65', '1', '禁用', '/admin/authority/users/disable', '', '2', '13', '13', '2', '1', '30', '', '0', '1', '2018-10-29 14:15:36', '1', '2018-10-29 14:15:36');
INSERT INTO `auth_menu` VALUES ('67', '1', '启用', '/admin/authority/users/enabled', '', '2', '13', '13', '2', '1', '40', '', '0', '1', '2018-10-29 14:33:21', '1', '2018-10-29 14:33:21');
INSERT INTO `auth_menu` VALUES ('68', '1', '删除', '/admin/authority/users/del', '', '2', '13', '13', '2', '1', '50', '', '0', '1', '2018-10-29 14:46:36', '1', '2018-10-29 14:46:36');
INSERT INTO `auth_menu` VALUES ('69', '1', '查询', '/admin/blog/note', '', '2', '39', '39', '2', '1', '0', '', '0', '1', '2018-10-29 14:48:36', '1', '2018-12-06 18:28:15');
INSERT INTO `auth_menu` VALUES ('71', '1', '查询', '/admin/authority/users', '', '2', '13', '13', '2', '1', '0', '', '0', '1', '2018-10-29 14:49:28', '1', '2018-10-29 14:49:28');
INSERT INTO `auth_menu` VALUES ('72', '1', '查询', '/admin/authority/role', '', '2', '14', '14', '2', '1', '0', '', '0', '1', '2018-10-29 14:51:26', '1', '2018-10-29 14:51:26');
INSERT INTO `auth_menu` VALUES ('73', '1', '新增', '/admin/authority/role/new', '/admin/authority/role/add', '2', '14', '14', '2', '1', '10', '', '0', '1', '2018-10-29 14:51:45', '1', '2018-10-29 14:53:10');
INSERT INTO `auth_menu` VALUES ('75', '1', '编辑', '/admin/authority/role/edit', '', '2', '14', '14', '2', '1', '30', '', '0', '1', '2018-10-29 14:52:39', '1', '2018-10-29 14:52:39');
INSERT INTO `auth_menu` VALUES ('76', '1', '授权', '/admin/authority/role/authority', '/admin/authority/rote/getMenuAuthority', '2', '14', '14', '2', '1', '40', '', '0', '1', '2018-10-29 14:53:45', '1', '2018-10-29 14:54:29');
INSERT INTO `auth_menu` VALUES ('77', '1', '删除', '/admin/authority/role/del', '', '2', '14', '14', '2', '1', '50', '', '0', '1', '2018-10-29 14:55:54', '1', '2018-10-29 14:55:54');
INSERT INTO `auth_menu` VALUES ('78', '1', '新增', '/admin/authority/menu/add', '', '2', '15', '15', '2', '1', '10', '', '0', '1', '2018-10-29 15:33:03', '1', '2018-10-29 15:33:03');
INSERT INTO `auth_menu` VALUES ('80', '1', '编辑', '/admin/authority/menu/edit', '', '2', '15', '15', '2', '1', '30', '', '0', '1', '2018-10-29 15:35:34', '1', '2018-10-29 15:35:34');
INSERT INTO `auth_menu` VALUES ('82', '1', '删除', '/admin/authority/menu/del', '', '2', '15', '15', '2', '1', '40', '', '0', '1', '2018-10-29 15:41:37', '1', '2018-10-29 15:41:37');

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES ('1', 'admin', 'ca865006490c5fd14d6c8ea501ef284b2f4b0eb28bc5716d1dd4606baf2b3521', '0', '18922442249', '0', '2018-04-01 19:50:21', 'aa9abc80b5964c38bd8e7e86b9b36d4f', '2018-08-20 15:37:53');


