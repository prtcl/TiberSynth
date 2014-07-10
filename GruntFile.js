
module.exports = function(grunt) {

    grunt.initConfig({
        options: { debug: false },
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true,
                    base: 'app'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', []);

};
