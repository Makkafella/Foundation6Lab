var gulp = require('gulp');
var fs = require('fs');

// Load config file
var config = JSON.parse(fs.readFileSync('./config.json'));
var now = new Date().toString().replace(/T/, ' ').replace(/\..+/, '');
var env = [];

var plugins = [];
plugins.sass = require('gulp-sass');
plugins.autoprefixer = require('gulp-autoprefixer');
plugins.rename = require("gulp-rename");
//plugins.uglifycss = require('gulp-uglifycss');
plugins.sourcemaps = require('gulp-sourcemaps');
plugins.uglify = require('gulp-uglify');
plugins.jshint = require('gulp-jshint');
plugins.concat = require('gulp-concat');
plugins.htmlhint = require("gulp-htmlhint");
plugins.handlebars = require('gulp-compile-handlebars');
plugins.del = require('del');
//plugins.bless = require('gulp-bless'); // Used when we need to split a CSS file due to IE
//plugins.less = require('gulp-less'); // Only used in LESS projects
plugins.uncss = require('gulp-uncss');
plugins.connect = require('gulp-connect');
plugins.livereload = require('gulp-livereload');
plugins.jshintstylish = require('jshint-stylish');
plugins.htmlhintstylish = require('htmlhint-stylish');
plugins.gulpif = require('gulp-if');
plugins.replace = require('gulp-replace');
plugins.insert = require('gulp-insert');

var browserSync = require('browser-sync').create();
var checkCSS = require( 'gulp-check-unused-css' );

var argv = require('yargs').argv;

env.isProduction = (argv.production === undefined) ? false : true;
env.isDevelopment = (argv.production === undefined) ? true : false;
env.now = now;

// Sets the destination DIR depending on production or development build.
if (env.isProduction) {
  env.destination = config.paths.destination.prod;
} else {
  env.destination = config.paths.destination.dev;
}

console.log('\033[2J');
console.log(' _  __                    _ _');
console.log('| |/ /_ __   _____      _(_) |_');
console.log('| \' /| \'_ \\ / _ \\ \\ /\\ / / | __|');
console.log('| . \\| | | | (_) \\ V  V /| | |_');
console.log('|_|\\_\\_| |_|\\___/ \\_/\\_/ |_|\\__|');
console.log('                         ');
console.log('######################################');
console.log('');

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, config, env);
}

// Empties the dist dir
gulp.task('clean', getTask('clean'));

// Build SASS
gulp.task('sass', getTask('sass'));

// Build LESS
gulp.task('less', getTask('less'));


// Removes unused CSS by looking at the finished HTML markup
gulp.task('uncss', getTask('uncss'));

// Build JS
gulp.task('jshint', getTask('jshint'));
gulp.task('packjs', ['jshint'], getTask('packjs'));
gulp.task('scripts', ['jshint', 'packjs']);

// Build HTML
gulp.task('buildhtml', getTask('buildhtml'));
gulp.task('htmlhint', ['buildhtml'], getTask('htmlhint'));
gulp.task('replace', ['buildhtml'], getTask('replace')); // Replaces "fixed" handlebar tags  "{@{" with normal "{{"
gulp.task('html', ['buildhtml', 'htmlhint', 'replace']);

// Copy files
gulp.task('copy', getTask('copy'));

// Start server at http://localhost:8080
gulp.task('server', getTask('connect'));

gulp.task('bs', function() {
    browserSync.init({
        proxy: "http://localhost:8080/mockups/"
    });
    gulp.watch("mockups/*.html").on('change', browserSync.reload);
    gulp.watch("mockups/assets/css/*.css").on('change', browserSync.reload);
    gulp.watch("mockups/assets/js/*.js").on('change', browserSync.reload);
});

gulp.task('gulp-check-unused-css', function() {
 gulp
    .src([ 'mockups/assets/css/*.css', 'mockups/*.html' ])
    .pipe( checkCSS() );

});

gulp.task('default', ['html', 'scripts', 'sass', 'copy']);
gulp.task('watch',function () {
  // plugins.livereload.listen();
	gulp.watch(config.paths.src.sass + '**/*.scss', ['sass']);
  gulp.watch(config.paths.src.html.dir + '**/*.html', ['html']);
  gulp.watch(config.paths.src.less + '**/*.less', ['less']);
	gulp.watch(config.paths.src.js + "**/*.js", ['scripts']);
  gulp.watch(config.paths.src.img + "**/*.*", ['copy']);
});
