import gulp from "gulp";
import uglify from "gulp-uglify";
import cssnano from "gulp-cssnano";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import clean from "gulp-clean";
import ignore from "gulp-ignore";

// Task to clean the 'dist' folder
// make sure this task is on top of all
gulp.task("clean", function() {
    return gulp
        .src(["./images/dist", "./javascript/dist", "./css/dist", "./dist"], {
            allowEmpty: true,
            read: false,
        })
        .pipe(clean());
});

// Task to minify HTML and exclude index.html
gulp.task("minify-html", function() {
    return gulp
        .src("./*.html")
        .pipe(ignore.exclude("index.html"))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./dist"));
});

// Task to minify and add prefixes to CSS
gulp.task("minify-css", function() {
    return gulp
        .src("./css/src/*.css")
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./css/dist"));
});

// Task to minify JS and concatenate
gulp.task("minify-js", function() {
    return gulp
        .src("./javascript/src/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./javascript/dist"));
});

// Task to optimize images
gulp.task("optimize-images", function() {
    return gulp
        .src("./images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./images/dist"));
});

// Watch task
gulp.task("watch", function() {
    gulp.watch("./*.html", gulp.series("minify-html"));
    gulp.watch("./css/src/*.css", gulp.series("minify-css"));
    gulp.watch("./javascript/src/*.js", gulp.series("minify-js"));
    gulp.watch("./images/*", gulp.series("optimize-images"));
});

// Default task
gulp.task(
    "default",
    gulp.series(
        "clean",
        "minify-html",
        "minify-css",
        "minify-js",
        "optimize-images"
    )
);