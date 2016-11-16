var gulp = require('gulp'),
	header = require('gulp-header'),
	pkg = require('./package.json'),
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
	//git version commit
	var runSequence = require('run-sequence');
	var bump = require('gulp-bump');
	var gutil = require('gulp-util');
	var git = require('gulp-git');
	var minimist = require('minimist');
	var fs = require('fs');
	//add rightInfo for compress file
	var banner = ['/**',
	  ' * <%= pkg.name %> - <%= pkg.description %>',
	  ' * @author : <%= pkg.author %>',
	  ' * @version : v<%= pkg.version %>',
	  ' * @website : <%= pkg.homepage %>',
	  ' * @createtime : <%= pkg.createtime %>',
	  ' * @edittime :'+new Date().toLocaleString('chinese',{hour12:false}),
	  ' **/',''].join('\n');
	//gulp task
gulp.task('jsmin', function() {
	gulp.src('js/*.js')
		.pipe(uglify({
			mangle: {"toplevel":true,"eval":true},
			compress: true
		}))
		.pipe(rename({
		    dirname: "/",
		    //basename: "base",
		    suffix: ".min",
		    extname: ".js"
		  }))
		.pipe(header(banner,{pkg:pkg}))
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
        .pipe(header(banner,{pkg:pkg}))
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
  gulp.watch(['*.html', 'css/*.css', 'js/*.js'], {cwd: 'dist'}, reload);
  
});
gulp.task('do', ['jsmin','cssmin','htmlmv','imgmin']);
gulp.task('watch', function () {
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

//**************************************
//auto add version and git tags
//**************************************
//major'主要升级 'minor'次要升级 'patch 补丁
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'patch' }
};
var options = minimist(process.argv.slice(2), knownOptions);
gulp.task('bump-version', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({type:options.env}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
  return gulp.src('.')
    .pipe(git.commit('[Prerelease] Bumped version number'), {args: '-a'});
});

gulp.task('push-changes', function (cb) {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });

  function getPackageJsonVersion () {
    // 这里直接解析 json 文件而不是使用 require，这是因为 require 会缓存多次调用，这会导致版本号不会被更新掉
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});

gulp.task('release', function (callback) {
  runSequence(
    'bump-version',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});