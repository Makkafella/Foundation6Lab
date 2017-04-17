// Replaces "fixed" handlebar tags with normal "{{"
module.exports = function (gulp, plugins, config, env) {
	return function () {
    gulp.src(env.destination.dir + env.destination.html + '*.html')
    .pipe(plugins.replace(/{@{/g, '{{'))
    .pipe(gulp.dest(env.destination.dir));
	};
};
