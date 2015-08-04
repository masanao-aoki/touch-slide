var gulp=require('gulp');
var plumber = require("gulp-plumber");
var sass = require('gulp-ruby-sass');
var pleeease = require('gulp-pleeease');
var webpack = require('webpack-stream');

// ソースディレクトリとか、ファイル名を指定。
var paths = {
  "scssSrc": "./sass",
  "scssSrc2": "./sass/*.scss",
  "cssSrc": "./root/css",
  "jsSrc": "./src/*.js",
  "jsSrc2": "./src/*.js",
  "jsDistSrc": "./root/js"
}

//webpack
gulp.task('webpack',function(){
    gulp.src([paths.jsSrc])
    .pipe(webpack({
      output: {
        filename: 'main.js',
      },
      resolve: {
        extensions: ['', '.js']
      },
     }))
    .pipe(gulp.dest(paths.jsDistSrc))
});


//sass
gulp.task('sass', function () {
    return sass(paths.scssSrc, {style: 'expanded',bundleExec: true})
    .on('error', function (err) {
      console.error('Error!', err.message);
   	})
    .pipe(plumber())
    .pipe(pleeease({
        "autoprefixer": {
            browsers: ["last 5 versions", "Firefox > 0", "Opera > 0", "ie > 7", "Chrome > 20"]
        },
        "rem": true,
        "rem": ["10px"],
        "minifier": false
    }))
    .pipe(gulp.dest(paths.cssSrc));
});

//watch
gulp.task('watch', ['sass','webpack'], function(){
  gulp.watch(paths.scssSrc2,["sass"]);
  gulp.watch(paths.jsSrc2,["webpack"]);
});