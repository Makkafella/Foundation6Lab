module.exports = function (gulp, plugins, config) {
	return function () {
		gulp.src(config.paths.src.less + '**/*.less')
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.plumber({
				errorHandler: function (error) {
					console.log(error.message);
					this.emit('end');
				}
			}))
			.pipe(plugins.less())
			.pipe(plugins.autoprefixer(config.css.autoprefixer))
			.pipe(gulp.dest(config.paths.dist.css))
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(plugins.uglifycss())
			.pipe(plugins.sourcemaps.write('maps'))
			.pipe(gulp.dest(config.paths.dist.css))
			.pipe(plugins.livereload())
	};
};
