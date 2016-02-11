module.exports = function(config){
  config.set({
    basePath : './',
    singleRun: false,

    files : [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/app/**/*.js',
      'test/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
