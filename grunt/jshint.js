
// Make sure code stylesheets are up to par and there are no obvious mistakes

module.exports =  function (grunt) {
    'use strict';
    return {

        all: [
          'Gruntfile.js',
          // '<%= config.public %>/js/bundle.js'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    };
};
