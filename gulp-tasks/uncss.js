module.exports = function (gulp, plugins, config, env) {
	return function () {
		gulp.src(env.destination.dir + dev.destination.css + 'styles.css')
			.pipe(plugins.uncss({
				html: [env.destination.dir + dev.destination.html + '*.html']
			}))
      .pipe(plugins.rename({
        suffix: '.stripped'
      }))
			.pipe(gulp.dest(env.destination.dir + dev.destination.css))
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      .pipe(plugins.uglifycss())
      .pipe(gulp.dest(env.destination.dir + dev.destination.css))
			.pipe(plugins.livereload())
	};
};
