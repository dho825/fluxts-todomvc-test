
// @see https://github.com/jmreidy/grunt-browserify

module.exports =  function (grunt) {
    'use strict';
    return {
        dist: {
            files: {
                '<%= config.public %>/js/bundle.js': ['<%= config.build %>/js/*.js']
            }
        }
    };
};

