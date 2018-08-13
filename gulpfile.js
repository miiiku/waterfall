const gulp      = require('gulp')
const babel     = require('gulp-babel')
const uglify    = require('gulp-uglify')
const rename    = require('gulp-rename')

gulp.task('compressJS', function () {
    gulp.src(['src/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
    gulp.watch(['src/*.js'], ['compressJS'])
})

gulp.task('release', ['compressJS'])

gulp.task('default', ['release', 'watch'])