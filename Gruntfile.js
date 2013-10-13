module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js','jquery.mobilenav.js'],
		},
		uglify: {
			options: {
				banner: '/*!'+ 
						'\n * <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %>' +
						'\n * author: <%= pkg.author %>' +
						'\n */\n'
			},
			dist: {
				files: {
					'jquery.mobilenav.min.js': ['jquery.mobilenav.js']
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['http://localhost:8000/test/test.html']
				}
			}
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['jshint', 'uglify', 'connect', 'qunit']);

};