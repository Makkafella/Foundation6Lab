module.exports = function (gulp, plugins, config, env) {
	return function () {
		gulp.src(env.destination.dir + env.destination.html + '*.html')
			.pipe(plugins.htmlhint(config.paths.src.html.hintrc).on('error', function(error) {
				console.log(error.message);
				this.emit('end');
			}))
			.pipe(plugins.htmlhint.reporter(plugins.htmlhintstylish))
	};
};
