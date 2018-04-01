var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// observación del proyecto
gulp.task('default', ['css' , 'javascript', 'html'], function() {

    browserSync.init({
        server: "./app"
    });

    // eliminarla junto a la función de abajo del todo para minificar y dejar el otro css sin minificar
    // gulp.watch("app/css/**/*.css", ['minify']);
    gulp.watch("app/js/*.js", ['javascript']).on('change', browserSync.reload);
    gulp.watch("scss/**/*.scss", ['css']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("./*.html", ['html']);
});

// minify HTML
gulp.task('html', function() {
    return gulp.src('./*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('app'));
});

// minify IMG
gulp.task('img', function(){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img'))
});

// minify JS
gulp.task('javascript', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js/dist'))
});

// compilación SASS,minificación css,autoprefijar
gulp.task('css', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

// minificar manteniendo el archivo sin minificar
// gulp.task('minify', function () {
//     gulp.src('app/css/*.css')
//         .pipe(cssnano({keepBreaks: true}))
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('app/css/dist'))
//     ;
// });