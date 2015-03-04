
// @see https://github.com/gruntjs/grunt-contrib-copy

module.exports =  function (grunt) {
    'use strict';
    return {
        tsx: {
            files: [
                // includes files within path
                {
                    expand: true,
                    src: ['src/**/*.tsx','src/**/*.ts'],
                    dest: ['<%= config.build %>/'],
                    filter: 'isFile',
                    rename: function(dest, src) {
                        return dest + src.replace('.tsx','.ts');
                    }
                }
            ]
        },
        typings: {
            files: [
                // includes files within path
                {
                    expand: true,
                    src: ['typings/**/*.d.ts'],
                    dest: ['<%= config.build %>/'],
                    filter: 'isFile',
                    rename: function(dest, src) {
                        return dest + src;
                    }
                }
            ]
        }
    };
};
// React.jsx(`([^`\]*(\.[^`\]*)*)`)
