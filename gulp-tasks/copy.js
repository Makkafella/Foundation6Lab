module.exports = function (gulp, plugins, config, env) {
	return function () {
		gulp.src(['src/dummy-content/**/*.*']).pipe(gulp.dest(env.destination.dir + env.destination.dummy))
		gulp.src(['src/fonts/**/*.*']).pipe(gulp.dest(env.destination.dir + env.destination.fonts))
		gulp.src(['src/dependencies/font-awesome/fonts/**/*.*']).pipe(gulp.dest(env.destination.dir + env.destination.fonts))
		gulp.src(['src/img/**/*.*']).pipe(gulp.dest(env.destination.dir + env.destination.img))
	};
};
