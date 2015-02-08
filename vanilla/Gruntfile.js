module.exports = function (grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    paths: {
      src: 'src',
      build: 'build', // Path for JavaScript and CSS before it is run through the r.js optimzer.
      dist: 'dist',
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= paths.build %>/lib',
        },
      },
    },

    copy: {
      js: {
        expand: true,
        flatten: false,
        cwd: '<%= paths.src %>/js',
        src: ['**/*.js'],
        dest: '<%= paths.build %>/js',
      },
      css: {
        expand: true,
        flatten: false,
        cwd: '<%= paths.build %>',
        src: ['**/*.css'],
        dest: '<%= paths.dist %>',
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
      requirejs: {
        dest: '<%= paths.dist %>/js/require.js',
        src: '<%= paths.build %>/lib/requirejs/require.js',
      },
    },

    requirejs: {
      compile: {
        options: {
          optimize: 'none', // Comment this out when doing production release
          baseUrl: '<%= paths.build %>',
          mainConfigFile: '<%= paths.build %>/js/app/main.js',
          name: 'js/app/main',
          out: '<%= paths.dist %>/js/421.js',
        },
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

  grunt.registerTask('build-css', ['copy:css']);
  grunt.registerTask('build-js', ['copy:js', 'copy:requirejs', 'requirejs']);
  grunt.registerTask('build-html', ['copy:html']);
  grunt.registerTask('build-images', ['copy:images']);
  grunt.registerTask('default', ['bower', 'build-css', 'build-images', 'build-html', 'build-js', 'watch']);
};
