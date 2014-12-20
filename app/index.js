'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
                chalk.red('Santiago') + ' generator!' + ' Angular, Material, Hammer, Node.js, Express, Socket.io.'
        ));

        var prompts = [
            {
                type: 'input',
                default: 'name',
                name: 'name',
                message: 'Name of your project?'
            }
        ];

        this.prompt(prompts, function (props) {
            this.name = props.name;

            done();
        }.bind(this));
    },
    scaffoldFolders: function () {
        this.mkdir("app");
    },

    writing: {
        app: function () {
            this.directory('./static/', './');
        }
    },

    install: function () {

        this.bowerInstall();
        this.npmInstall();
        /*
         this.installDependencies({
         skipInstall: this.options['skip-install']
         });*/
    }
});
