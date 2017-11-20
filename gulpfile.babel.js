import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import gutil from 'gulp-util'
import rename from 'gulp-rename'
import cssnano from 'cssnano'
import browserSync from 'browser-sync'
import nodemon from 'gulp-nodemon'
import plamber from 'gulp-plumber'
import path from 'path'

let bSync = browserSync.create()

const PATHS = {
    src_scss    : './src/public/scss',
    src_js      : './src/public/js',
    dist_scss   : './dist/public/css',
    dist_js     : './dist/public/js'
}

let onError = (err) => {
    gutil.beep()
    console.log(err)
}

gulp.task('sass', () => {
    let plgs = [autoprefixer({ browsers: ['last 2 versions'] }), cssnano()]

    return gulp.src(path.join(PATHS.src_scss, '*.scss'))
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss(plgs))
                .pipe(rename( { suffix: '.min' } ))
                .pipe(gulp.dest(PATHS.dist_scss))
                .pipe(bSync.stream())        
})

gulp.task('babel', () => {
    return gulp.src(path.join(PATHS.src_js, '*.js'))
                .pipe(plumber( { errorHandler: onError } ))
                .pipe(babel( { presets: ['env'] } ))
                .pipe(gulp.dest(PATHS.dist_js))
})