var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    wait = require('gulp-wait');


gulp.task('style',function(){
    return gulp.src('app/sass/*.sass')
        .pipe(wait(500))
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers:['last 15 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
})    


gulp.task('server', function(){
    browserSync({
        notify: false,
        server:{
            baseDir: 'app'
        }
    });
});


gulp.task('watch',['server','style'], function(){
    gulp.watch('app/sass/*.sass',['style']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/**/*.js').on('change', browserSync.reload);
})