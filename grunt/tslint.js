
// Make sure TypeScript code is up to par

module.exports =  function (grunt) {
    'use strict';
    return {

        options: {
            configuration: grunt.file.readJSON('.tslintrc')
        },
        all: {
            src: [
                'src/**/*.ts',
                'test/**/*.ts',
                '!src/client/app/Version.ts',
                '!src/server/app/Version.ts'
            ]
        }
    };
};
