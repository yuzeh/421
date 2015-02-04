module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    bower: {
      install: {
      },
    },
    bowerRequireJs: {
      rjsConfig: 'app/main.js',
    },
  });

  grunt.registerTask('default', ['bower']);

//
//  grunt.initConfig({
//
//    pkg: grunt.file.readJSON('package.json'),
//
//    /**
//     * Define structure paths
//     */
//    paths: {
//      'bower': 'bower_components',
//      'dist': 'dist',
//      'src': 'src'
//    },
//
//    /**
//     * Compile .jade files
//     * Pickup only files finded in source directory
//     * (not subdirectores)
//     */
//    jade: {
//      options: {
//        pretty: true,
//        data: {
//          debug: true
//        }
//      },
//      dist: {
//        files: {
//          '<%= paths.dist %>/gift/index.html': '<%= paths.src %>/gift.jade',
//          '<%= paths.dist %>/signup/index.html': '<%= paths.src %>/signup.jade',
//        }
//      } },
//
//    /**
//     * Compile all .less files
//     */
//    less: {
//      options: {
//        paths: [
//          "<%= paths.bower %>/bootstrap/less",
//          "<%= paths.bower %>/components-font-awesome/less",
//          "<%= paths.bower %>/bootstrap-datepicker/build"
//        ]
//      },
//      normal: {
//        files: {
//          "<%= paths.dist %>/css/styles.css": [
//            '<%= paths.src %>/less/*.less'
//          ]
//        }
//      },
//      min: {
//        options: {
//          cleancss: true,
//          report: 'min'
//        },
//        files: {
//          "<%= paths.dist %>/css/styles.min.css": ['<%= paths.src %>/less/*.less']
//        }
//      }
//    },
//
//    /**
//     * Merege all scripts
//     * into one file
//     */
//    concat: {
//      options: {
//        separator: ';'
//      },
//      dist: {
//        files: {
//          '<%= paths.dist %>/js/scripts.js': [
//            '<%= paths.src %>/js/**/*.js'
//          ]
//        }
//      }
//    },
//
//    /**
//     * Minify mereged script file
//     */
//    uglify: {
//      options: {
//        report: 'min'
//      },
//      dist: {
//        files: [{
//          '<%= paths.dist %>/js/scripts.min.js': [
//            '<%= paths.dist %>/js/scripts.js'
//          ]
//        }],
//      }
//    },
//
//    imagemin: {
//      dynamic: {
//        files: [{
//          expand: true,
//          flatten: true,
//          src: '<%= paths.src %>/images/**/*.{png,jpg,jpeg,gif}',
//          dest: '<%= paths.dist %>/images'
//        }],
//      },
//    },
//
//    /**
//     * Copy files
//     */
//    copy: {
//      raw: {
//        files: [{
//          expand: true,
//          cwd: '<%= paths.src %>/raw',
//          src: '**/*',
//          dest: '<%= paths.dist %>/',
//        }],
//      },
//      favicon: {
//        expand: true,
//        flatten: true,
//        src: '<%= paths.src %>/favicon/*',
//        dest: '<%= paths.dist %>/favicon/',
//      },
//      fonts: {
//        expand: true,
//        flatten: true,
//        src: '<%= paths.src %>/fonts/**/*',
//        dest: '<%= paths.dist %>/fonts/',
//      },
//      components: {
//        files: [
//          {
//            expand: true,
//            flatten: true,
//            cwd: '<%= paths.bower %>/',
//            src: [
//              'jquery/dist/jquery.min.js',
//              'jquery/dist/jquery.min.map',
//              'bootstrap/dist/js/bootstrap.min.js',
//              'parsleyjs/dist/parsley.min.js',
//              'modernizr/modernizr.js',
//              'detectizr/dist/detectizr.min.js',
//              'detectizr/dist/detectizr.min.map',
//              'bootstrap-datepicker/js/bootstrap-datepicker.js'
//            ],
//            dest: '<%= paths.dist %>/js/vendor/'
//          },
//          {
//            expand: true,
//            flatten: true,
//            cwd: '<%= paths.bower %>/',
//            src: [
//              'jquery/dist/jquery.min.js',
//              'jquery/dist/jquery.min.map',
//              'jQuery-Mask-Plugin/dist/jquery.mask.js',
//              'jQuery-Mask-Plugin/dist/jquery.mask.min.js',
//              'bootstrap/dist/js/bootstrap.min.js',
//              'parsleyjs/dist/parsley.min.js',
//              'modernizr/modernizr.js',
//              'detectizr/dist/detectizr.min.js',
//              'detectizr/dist/detectizr.min.map',
//              'bootstrap-datepicker/js/bootstrap-datepicker.js'
//            ],
//            dest: '<%= paths.dist %>/js2/lib/'
//          },
//          {
//            expand: true,
//            flatten: true,
//            cwd: '<%= paths.bower %>/',
//            src: 'components-font-awesome/fonts/*',
//            dest: '<%= paths.dist %>/fonts/'
//          },
//        ]
//      },
//    },
//
//
//
//    /**
//     * Set watch
//     */
//    watch: {
//      jade: {
//        files: ['<%= paths.src %>/**/*.jade'],
//        tasks: ['build-html']
//      },
//      less: {
//        files: ['<%= paths.src %>/less/**/*.{css,less}'],
//        tasks: ['build-css']
//      },
//      js: {
//        files: ['<%= paths.src %>/js/**/*.js'],
//        tasks: ['build-js']
//      },
//      img: {
//        files: ['<%= paths.src %>/images/**/*.{jpg,jpeg,png,gif,svg}'],
//        tasks: ['build-img']
//      },
//      copy: {
//        files: ['<%= paths.src %>/raw/**/*'],
//        tasks: ['build-copy'],
//      },
//    }
//  });
//
//  /**
//   * Register grunt tasks
//   */
//  grunt.registerTask('default', [
//    'jade',
//    'less',
//    'concat',
//    'uglify',
//    'copy',
//    'imagemin',
//    'watch'
//  ]);
//
//  grunt.registerTask('build-html', [
//    'jade',
//  ]);
//
//  grunt.registerTask('build-css', [
//    'less', 'copy:fonts'
//  ]);
//
//  grunt.registerTask('build-js', [
//    'concat', 'uglify', 'copy'
//  ]);
//
//  grunt.registerTask('build-img', [
//    'imagemin'
//  ]);
//
//  grunt.registerTask('build-copy', [
//    'copy',
//  ]);

};
