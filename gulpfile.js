var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	cssmini = require('gulp-minify-css'),
	cssver = require('gulp-make-css-url-version'),
	autopre = require('gulp-autoprefixer'),
	htmlrev = require('gulp-rev-append'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	htmlmin = require('gulp-htmlmin'),
	less = require('gulp-less'),
	browsersync = require('browser-sync'),
	reload = browsersync.reload;

gulp.task('jsmin', function() {
	gulp.src('js/*.js')
		.pipe(uglify({
			mangle: true,
			compress: true
		}))
		.pipe(rename({
		    dirname: "/",
		    //basename: "base",
		    suffix: ".min",
		    extname: ".js"
		  }))
		.pipe(gulp.dest('dist/js'));
});
gulp.task('cssmin', function () {
    gulp.src('css/*.css')
    	.pipe(cssver({
    		format:"yyyyMdhhmmss",
    		useDate:true
    	}))
//  	.pipe(autopre({
//          browsers: ['last 2 versions', 'ie 6-8'],
//          cascade: true,
//          remove:true
//      }))
        .pipe(cssmini({
            advanced: false,
            compatibility: 'ie7'
        }))
        .pipe(rename({
		    dirname: "/",
		    //basename: "base",
		    suffix: ".min",
		    extname: ".css"
		  }))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('imgmin', function () {
    gulp.src('img/*.{png,jpg,gif,svg,ico}')
        .pipe(imagemin({
        	optimizationLevel: 5,
            progressive: true,
            interlaced: true, 
            multipass: true ,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()] 
        }))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('imgsome', function () {
    gulp.src('img/*.{png,jpg,gif,svg,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
gulp.task('htmlmv', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src('*.html')
    	.pipe(htmlrev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
gulp.task('htmlv', function () {
    gulp.src('index.html')
        .pipe(htmlrev())
        .pipe(gulp.dest('dist'));
});

gulp.task('doless', function () {
    gulp.src('less/index.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});
gulp.task('server', function() {
  browsersync({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'dist'}, reload);
});
gulp.task('do', ['jsmin','cssmin','htmlmv','imgmin']);
gulp.task('wache', function () {
    gulp.watch('css/*.css', ['cssmin']);
    gulp.watch('js/*.js', ['jsmin']);
});
gulp.task('help', function(){
	
	//console.log("	jschk-------------------------------[检查js文件]");
	console.log("	jsmin-------------------------------[压缩js文件]");
	console.log("	doless------------------------------[编译less文件]")
	console.log("	cssmin------------------------------[压缩css文件，添加url版本号]")
	console.log("	imgmin------------------------------[压缩img文件]")
	console.log("	imgsome-----------------------------[压缩修改过的img文件]")
	console.log("	htmlmin-----------------------------[压缩html文件]")
	console.log("	htmlv-------------------------------[添加html版本号]")
	console.log("	htmlmv------------------------------[添加html版本号并压缩]")
	console.log("	server------------------------------[web浏览]")
});