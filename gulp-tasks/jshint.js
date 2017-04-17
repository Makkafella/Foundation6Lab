module.exports = function (gulp, plugins, config) {
	return function () {
		gulp.src([config.paths.src.js + '**/*.js'])
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter(plugins.jshintstylish));
	};
};
