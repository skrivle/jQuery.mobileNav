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
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint','uglify']);

};