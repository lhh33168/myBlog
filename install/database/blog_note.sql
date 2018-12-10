/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-12-10 18:31:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog_note
-- ----------------------------
DROP TABLE IF EXISTS `blog_note`;
CREATE TABLE `blog_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(300) NOT NULL COMMENT '标题',
  `intro` varchar(1200) NOT NULL COMMENT '版本号',
  `content` blob COMMENT '内容',
  `keyword` varchar(300) DEFAULT NULL COMMENT '关键字',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态：1表示草稿；2表示已发布；',
  `create_user_id` int(11) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_user_id` int(11) NOT NULL COMMENT '更新人',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
