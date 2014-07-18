// Karma configuration
// Generated on Wed Jun 25 2014 17:14:55 GMT+1100 (Pacifique Centre)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'client/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/components/angular/angular.js',
            'bower_components/components/angular-mocks/angular-mocks.js',
            'bower_components/components/lodash/dist/lodash.js',

            'src/validation/ValidationModule.js',
            'src/validation/Validators.js',

            'src/validation/_spec/Validation.spec.js',
            'src/validation/_spec/mocks/EmployeeEntity.js',

            'src/validation/entity-field.html'
        ],


        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/validation/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: '',
            // prepend this to the
            prependPrefix: '',

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'TemplatesModule'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//      PhantomJS
        // Chrome
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
