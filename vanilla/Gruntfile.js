module.exports = function (grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    paths: {
      src: 'src',
      dist: 'dist',
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= paths.dist %>/lib',
        },
      },
    },

    copy: {
      js: {
        expand: true,
        flatten: false,
        cwd: '<%= paths.src %>/js',
        src: ['**/*.js'],
        dest: '<%= paths.dist %>/js',
      },
      html: {
        expand: true,
        flatten: false,
        cwd: '<%= paths.src %>/html',
        src: ['**/*.html'],
        dest: '<%= paths.dist %>',
      },
      images: {
        expand: true,
        flatten: false,
        cwd: '<%= paths.src %>/images',
        src: ['**/*.*'],
        dest: '<%= paths.dist %>/images',
      },
    },

    watch: {
      js: {
        files: ['<%= paths.src %>/js/**/*.js'],
        tasks: ['build-js'],
      },
      html: {
        files: ['<%= paths.src %>/html/**/*.html'],
        tasks: ['build-html'],
      },
      images: {
        files: ['<%= paths.src %>/images/**/*.*'],
        tasks: ['build-images'],
      },
    },
  });

  grunt.registerTask('default', ['bower', 'copy', 'watch']);
  grunt.registerTask('build-js', ['copy:js']);
  grunt.registerTask('build-html', ['copy:html']);
  grunt.registerTask('build-images', ['copy:images']);
};
