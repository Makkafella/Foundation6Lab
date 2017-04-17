var minifyCss = require('gulp-minify-css');
module.exports = function (gulp, plugins, config, env) {
	return function () {
		gulp.src(config.paths.src.sass + '**/*.{sass,scss}')
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass({
				sourceComments: true,
				outputStyle: 'expanded'
			}).on('error', function(error) {
				console.log(error.message);
				this.emit('end');
			}))
			.pipe(plugins.autoprefixer(config.css.autoprefixer))
			.pipe(plugins.insert.prepend('/* Created: ' + env.now + ' */'))
			.pipe(gulp.dest(env.destination.dir + env.destination.css))
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(minifyCss().on('error', function(error) {
				console.log(error.message);
				this.emit('end');
			}))
			.pipe(plugins.sourcemaps.write('maps'))
			.pipe(plugins.insert.prepend('/* Created: ' + env.now + ' */'))
			.pipe(gulp.dest(env.destination.dir + env.destination.css))
			.pipe(plugins.livereload())
	};
};
