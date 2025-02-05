# Gulp

## 1. installation

```bash
npm ini -y
npm install

npm install gulp gulp-cli --save-dev
npm i gulp-uglify gulp-cssnano gulp-htmlmin gulp-imagemin gulp-autoprefixer gulp-rename gulp-sourcemaps gulp-concat gulp-clean gulp-ignore --save-dev
```

## 2. update package.json

```bash
"scripts": {
  "gulp": "gulp",
  "gulp-clean": "gulp clean",
  "gulp-watch": "gulp watch"
}
```

## 3. create gulpfile.mjs in root dir

```bash
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
```

## 4. minify files using

```bash
npm run gulp
```

## 5. watch files changes to run gulp on each change / save using

```bash
npm run gulp-watch
```

## 5. clean task to clean dist dir using

```bash
npm run gulp-clean
```

## Acknowledgements

gulp-uglify: Minifies JavaScript files to reduce file size and improve load times by removing whitespace and comments.

gulp-cssnano: Minifies CSS files, optimizing them by eliminating unnecessary spaces, comments, and using shorthand properties.

gulp-htmlmin: Minifies HTML files by removing whitespace and comments, reducing the overall file size.

gulp-imagemin: Compresses image files (PNG, JPEG, GIF, SVG) without losing quality, helping to speed up page loading.

gulp-autoprefixer: Automatically adds vendor prefixes to CSS rules, ensuring broader compatibility across different browsers.

gulp-rename: Allows you to rename files within your Gulp tasks, enabling changes to file names or extensions easily.

gulp-sourcemaps: Generates source maps for your minified files, allowing you to trace errors back to the original source files during development, which is especially useful for debugging.

gulp-concat: Combines multiple files into a single file, reducing the number of HTTP requests needed to load resources.

gulp-clean: Deletes specified files or directories, often used to clean up before creating a new build
