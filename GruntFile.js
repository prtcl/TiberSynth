
module.exports = function(grunt) {

    grunt.initConfig({
        options: { debug: false },
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    keepalive: true,
                    base: 'build'
                }
            }
        },
        watch: {
            dev: {
                files: ['src/**'],
                tasks: ['build:dev'],
                options: { atBegin: true }
            }
        },
        browserSync: {
            dev: {
                bsFiles: { src : 'build/**' },
                options: {
                    watchTask: true,
                    server: { baseDir: 'build' }
                }
            }
        },
        clean: {
            build: ['build']
        },
        copy: {
            dev: {
                mode: 644,
                files: [
                    { src: 'src/css/*.css', dest: 'build/static/css/', flatten: true, expand: true },
                    { src: 'src/components/jquery/dist/jquery.js', dest: 'build/static/lib/jquery.js' },
                    { src: 'src/components/underscore/underscore.js', dest: 'build/static/lib/underscore.js' },
                    { src: 'src/components/backbone/backbone.js', dest: 'build/static/lib/backbone.js' },
                    { src: 'src/components/plonk/plonk.js', dest: 'build/static/lib/plonk.js' },
                    { src: 'src/components/d3/d3.js', dest: 'build/static/lib/d3.js' },
                    { src: 'src/components/handlebars/handlebars.js', dest: 'build/static/lib/handlebars.js' },
                    { src: 'src/components/requirejs/require.js', dest: 'build/static/lib/require.js' },
                    { src: 'src/components/requirejs-text/text.js', dest: 'build/static/lib/text.js' },
                    { cwd: 'src', src: 'app/**', dest: 'build/static/', expand: true }
                ]
            },
            img: {
                mode: 644,
                files: [{ src: 'src/img/*', dest: 'build/static/img/', flatten: true, expand: true }]
            }
        },
        concat: {
            libs: {
                src: [
                    'src/components/jquery/dist/jquery.js',
                    'src/components/underscore/underscore.js',
                    'src/components/backbone/backbone.js',
                    'src/components/plonk/plonk.js',
                    'src/components/d3/d3.js',
                    'src/components/handlebars/handlebars.js',
                    'src/components/requirejs/require.js',
                ],
                dest: 'build/static/lib/combo.js'
            }
        },
        uglify: {
            libs: {
                files: { 'build/static/lib/combo.js': ['<%= concat.libs.dest %>'] }
            }
        },
        'compile-handlebars': {
            dev: {
                template: 'src/templates/app.hbs',
                templateData: {
                    prod: false,
                    cssFiles: [
                        '/static/css/main.css'
                    ],
                    scripts: [
                        '/static/lib/jquery.js',
                        '/static/lib/underscore.js',
                        '/static/lib/backbone.js',
                        '/static/lib/plonk.js',
                        '/static/lib/d3.js',
                        '/static/lib/handlebars.js',
                        '/static/lib/require.js'
                    ]
                },
                output: 'build/index.html'
            },
            prod: {
                template: 'src/templates/app.hbs',
                templateData: {
                    prod: true,
                    cssFiles: [
                        '/static/css/style.css'
                    ],
                    scripts: [
                        '/static/lib/combo.js'
                    ]
                },
                output: 'build/index.html'
            }
        },
        htmlmin: {
            dev: {
                options: {
                    removeComments: true
                },
                files: { 'build/index.html': 'build/index.html' }
            },
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: { 'build/index.html': 'build/index.html' }
            }
        },
        requirejs: {
            app: {
                options: {
                    baseUrl: 'src/app',
                    paths: { 'text': '../components/requirejs-text/text' },
                    name: 'app',
                    out: 'build/static/app/app.js'
                }
            },
            css: {
                options: {
                    cssIn: 'src/css/main.css',
                    out: 'build/static/css/style.css',
                    optimizeCss: 'standard'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', []);
    grunt.registerTask('build:dev', ['clean:build', 'copy:dev', 'copy:img', 'compile-handlebars:dev', 'htmlmin:dev']);
    grunt.registerTask('build:prod', ['clean:build', 'concat:libs', 'uglify:libs', 'copy:img', 'compile-handlebars:prod', 'htmlmin:prod', 'requirejs']);
    grunt.registerTask('develop', ['browserSync', 'watch:dev']);
    grunt.registerTask('test-prod', ['build:prod', 'connect']);

};
