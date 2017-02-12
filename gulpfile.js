var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    wait = require('gulp-wait'),
    embed = require('gulp-angular-embed-templates'),
    csso = require('gulp-csso'),
    annotate = require('gulp-ng-annotate'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify');


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

gulp.task('publicserver', function(){
    browserSync({
        notify: false,
        server:{
            baseDir: 'public'
        }
    });
});


gulp.task('collect',function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.css',csso()))
        .pipe(gulpif('*.js', annotate()))
        .pipe(gulpif('*.js', embed({
            options:{basePath:'/js'}
        })))
        // .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('public'))
})

gulp.task('copyimgs',function(){
    return gulp.src('app/images/**')
        .pipe(gulp.dest('public/images/'))
})

gulp.task('build',['collect','copyimgs']);

gulp.task('watch',['server','style'], function(){
    gulp.watch('app/sass/*.sass',['style']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/**/*.js').on('change', browserSync.reload);
})