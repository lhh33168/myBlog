'use strict';

/*
	安装gulp、gulp-sass
	目的：sass->css

	gulp的使用
		* gulp.task(name,callback)
		* gulp.src(path)
		* gulp.dest()
		* gulp.watch(path,tasks)
	匹配：
		* 一个星“*”匹配所有文件
		* 两个星“**”匹配所有文件夹
 */

// 在此处使用gulp、gulp-sass
// 模块化：require()

// 引入gulp模块，得到一个对象/函数
let gulp = require('gulp');
let sass = require('gulp-sass');

let path = {
	sass:'./app/public/scss/*.scss',
	js:'./app/public/js/*.js',
	css:'./app/public/css/*.css',
	html:'./app/public/html/*.html'
}
let output = {
    dist:'./dist/',
    libs:'./dist/lib'
}


// 创建任务
// 编译sass文件
gulp.task('compileSass',function(){
	// 返回文件流
	gulp.src(path.sass)

		// 编译
		.pipe(sass({outputStyle:'compact'}))

		// 输出
		.pipe(gulp.dest('./app/public/css'))
});

// 自动化任务
// 监听sass文件修改，自动编译
gulp.task('jtSass',function(){
	// 监听这个文件，当文件有修改时，执行响应任务
	gulp.watch(path.sass,['compileSass']);
});


// 合并压缩js文件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

gulp.task('mergeJs',function(){
	// 找到js文件所在位置
	gulp.src(path.js)

		// 合并所有js文件
		.pipe(concat('page.js'))

		// 输出
		.pipe(gulp.dest('./dist/'))

		// 压缩
		.pipe(uglify())

		// 重命名
		.pipe(rename({suffix: ".min"}))

		// 输入压缩后的文件
		.pipe(gulp.dest('./dist/'))
});



gulp.task('default',function(){
    // 筛选出需要的js、css、html，进行操作，再放回文件流。
    var jsFilter = filter('./app/public/js/*.js',{restore:true});
    var cssFilter = filter('./app/public/css/*.css',{restore:true});
    var indexHtmlFilter = filter(['./app/public/html/*.html','!./app/public/index.html'],{restore:true});
    console.log(jsFilter)
    //通过gulp-src获取到文件
    gulp.src('./app/public/index.html')
        // 执行注释里的操作
        .pipe(useref())

        // 对js文件进行处理，先找到，再压缩，然后扔回文件流
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)

        // 对css文件进行处理，先找到，再压缩，然后扔回文件流
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)

        // 对html文件进行处理,先找到，再改名，然后扔回文件流
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)

        // 更新index引用文件名字
        .pipe(revReplace())

        // 全部文件扔到dist目录下
        .pipe(gulp.dest('./dist/'));
});
