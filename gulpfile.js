const gulp      = require('gulp')
const babel     = require('gulp-babel')
const uglify    = require('gulp-uglify')
const rename    = require('gulp-rename')

gulp.task('compressJS', done => {
    gulp.src(['src/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))

    done()
})

gulp.task('watch', function() {
    gulp.watch(['src/*.js'], gulp.series('compressJS'))
})

gulp.task('release', gulp.series('compressJS'))

gulp.task('default', gulp.series(gulp.parallel('release', 'watch')))