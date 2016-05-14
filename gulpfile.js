var gulp = require("gulp"),
	server = require("gulp-express"),
	jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	jshint = require("gulp-jshint"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),
	app = require("./app");

var onError = function(err) {
	err = {
		"Name": err.name,
		"File": err.file,
		"Reason": err.reason,
		"Message": err.message
	}
	console.log(err);
	this.emit("end");
};

gulp.task("styles", function() {
	return gulp.src("styles/*.scss")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass({
			style: "expanded",
			errLogToConsole: true
		}))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: true
		}))
		.pipe(gulp.dest("public/_styles"))
		.pipe(server.notify());
});

gulp.task("scripts", function() {
	return gulp.src("scripts/*.js")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(gulp.dest("public/_scripts"))
		.pipe(server.notify());
});

gulp.task("views", function() {
	return gulp.src("views/_pages/**/*.jade")
		.pipe(jade({pretty: false}))
    	.pipe(gulp.dest("public"))
		.pipe(plumber({ errorHandler: onError }))
		.pipe(server.notify());
});

gulp.task("server", function () {
	server.run(["./bin/www"]);
	gulp.watch("styles/**/*.scss", ["styles"]);
	gulp.watch("scripts/**/*.js", ["scripts"]);
	gulp.watch("views/**/*.jade", ["views"]);
});

gulp.task("default", ["styles", "scripts", "server", "views"], function() { });
