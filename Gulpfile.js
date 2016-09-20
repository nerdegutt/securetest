const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  fs = require('fs');

gulp.task('jshint', () => jshintHelper(stylish));

const jshintHelper = reporter => {
  //First add all .js-files then remove node_modules
  //(see http://gruntjs.com/api/grunt.file#grunt.file.expand)
  gulp.src(['**/*.js', '!node_modules/**/'])
    .pipe(jshint())
    .pipe(jshint.reporter(reporter));
};

gulp.task('test', () => console.log('Run test command!'));

gulp.task('nodemon', () => {
  nodemon({
    script: 'index.js',
    ext: 'js hbs css',
    ignore: [
      'node_modules/*'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    nodeArgs: ['--debug=9998']
  }).on('change', () => {
    var fs = require('fs');
    fs.writeFile(__dirname + '/reload.log', 'started');
  });
});

gulp.task('init', () => {
  const myDir = './static/uploads';
  fs.mkdir(myDir, '0755', err => {
    if (!err) {
      console.log('Created directory ' + myDir);
    } else {
      console.log(err);
    }
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [/*'init',*/ 'jshint', 'nodemon']);
gulp.task('watch', ['nodemon']);
