/**
 * Created by kidding on 2017/8/7.
 */
const gulp = require('gulp');
const gulp_less = require('gulp-less');
const gulp_connect = require('gulp-connect');
const gulp_concat = require('gulp-concat');
const gulp_uglify = require('gulp-uglify');
const gulp_rename = require('gulp-rename');
const gulp_minify_css = require('gulp-minify-css');
const gulp_imagemin = require('gulp-imagemin');

gulp.task('html',function () {
    // gulp.src('index.html').pipe()
    console.log("hello gulp...")
});
//copy file
gulp.task('copy-html',function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(gulp_connect.reload());
});
/**
 * copy-images and imagemin
 */
gulp.task('copy-images',function(){
  return gulp.src('images/**/*')
      .pipe(gulp_imagemin())
      .pipe(gulp.dest('./dist/images'))
});

/** 复制并编译less为css
* gulp_minify_css 压缩css
*/
gulp.task("copy-less",function () {
   return gulp.src('./css/**/*.less')
       .pipe(gulp_less())
       .pipe(gulp_minify_css())
       .pipe(gulp.dest('./dist/css'))
       .pipe(gulp_connect.reload());
});
/**复制js 制定文件合并为一个connect.js文件
 * 并通过gulp_uglify最小化js（压缩）
 */
gulp.task("copy-js",function () {
    // gulp.src(['js/a.js','js/b.js','js/b.js']])
    return gulp.src('./js/**/*.js')
        .pipe(gulp_concat('connect.js'))
        .pipe(gulp_uglify())
        .pipe(gulp_rename('bundles.js'))
        .pipe(gulp.dest('./dist/js'));
});

//创建本地服务
gulp.task('creat-server',function () {
    gulp_connect.server({
        root : 'dist',
        port : 8089,
        livereload: true,
    })
});

//对文件进行监听
gulp.task('watchs',function () {
    gulp.watch('./**/*.html',['copy-html']);
    gulp.watch('./css/**/*.less',['copy-less']);
});

gulp.task('default',['creat-server','html','copy-html','copy-js','copy-less','copy-images','watchs']);
