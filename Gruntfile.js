module.exports = function(grunt) {

	var serverPort = 8003;

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
					port: serverPort,
					base: '.'
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['http://localhost:'+ serverPort +'/test/test.html']
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