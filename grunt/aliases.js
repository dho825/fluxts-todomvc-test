
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('check-code-style', [
        'jshint:all',
        'tslint:all'
    ]);

    grunt.registerTask('build', [
        'npm-install',
        'clean',
        'copy:tsx',
        'copy:typings',
        'replace:jsx',
        'ts:app',
        'browserify:dist',
        'closureCompiler:bundle'
    ]);

    grunt.registerTask('test', [
        'check-code-style'
    ]);

    grunt.registerTask('serve', [
        'connect:public:keepalive'
    ]);

    grunt.registerTask('default', ['build']);
}
