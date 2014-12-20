var path = require('path');
var chalk = require('chalk');

module.exports = function (grunt) {
    // Do grunt-related things in here

    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-nodemon');

    var jsFiles = require('./config').getMinified();//minified.
    var jsToMinimize = require('./config').getEngineScripts(); // to minify
    var pathJsFiles = path.join('./public', require('./config').getProdPath()); //prod js path.

    var gruntConfig = {
        uglify: {
            toProd: {
                files: {

                }
            }
        },
        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    callback: function (nodemon) {
                        nodemon.on('start', function () {
                            setTimeout(function () {
                                livereloadserver().restart();
                            }, 400);
                        })
                    }
                }
            }
        }


    };
    gruntConfig.uglify.toProd.files[pathJsFiles] = jsToMinimize;

    grunt.initConfig(gruntConfig);

    grunt.registerTask('livereloadserver', function () {
        livereloadserver();
    });

    grunt.registerTask('addMinifiedFiles', function () {
        var result = '';
        jsFiles.forEach(function (f) {
            result += (grunt.file.read(('.' + f)).toString('utf8') + '\n');
        });

        result += (grunt.file.read(pathJsFiles).toString('utf8') + '\n');
        result = result.split('# sourceMappingURL=').join(' ');
        grunt.file.write(pathJsFiles, result, {encoding: 'utf8'});
        grunt.log.writeln(chalk.green('> ') + 'Change var env = \'dev\'; to \'prod\' to serve js production files. ' + chalk.red('file: ./config.js'));

    });

    grunt.registerTask('addPublicPrefix', function () {
        for (var i = 0; i < jsToMinimize.length; i++) {
            jsToMinimize[i] = path.join('./public/', jsToMinimize[i]);
        }
        grunt.log.write(chalk.green('>> ') + chalk.blue(jsToMinimize.length) + ' files with public prefix')
    });

    grunt.registerTask('jsProd', ['addPublicPrefix', 'uglify:toProd', 'addMinifiedFiles']);
    grunt.registerTask('serve', ['livereloadserver', 'nodemon:dev']);
};


var http = require('http').Server();
var io = require('socket.io')(http);
var once = true;

function livereloadserver() {
    if (once) {
        once = false;

        io.on('connection', function (socket) {
        });


        http.listen(6868, function () {
            console.log('listening on *:6868');
        });
    }
    return {
        restart:function() {
            io.emit('restart');
        }
    }
}