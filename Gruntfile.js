'use strict';

module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/*.*'],
		jst: {
			compile: {
				files: {
					'public/pkg.js': ['app/templates/*.html']
				}
			}
		},
		concat: {
			index: {
				src: ['index.html'],
				dest: 'public/index.html'
			},
			app: {
				src: [
          'public/pkg.js',
          'app/init.js',
					'app/views/*.js',
					'app/router.js'
				],
				dest: 'public/pkg.js'
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'public'
				}
			}
		},
		watch: {
			all: {
				files: ['app/**/*.*', 'index.html'],
				tasks: [
					'clean',
					'jst',
					'concat'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'clean',
		'jst',
		'concat',
		'connect',
		'watch'
	]);

};