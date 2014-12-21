'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../../package.json');
    },

    prompting: function () {
        var done = this.async();


        var name = this.arguments[0];

        var prompts = [
            {
                type: 'input',
                default: 'name',
                name: 'name',
                message: 'Name of the controller?'
            }
        ];
        if (!name) {
            this.log(yosay(
                    chalk.red('Santiago') + ' Controller generator!'
            ));
            this.prompt(prompts, function (props) {
                this.name = props.name;

                done();
            }.bind(this));
        }
        else {
            this.name = name;
            done();
        }
    },

    writing: {
        route: function () {

            this.fs.copyTpl(
                this.templatePath('_controller.js'),
                this.destinationPath('./public/js/controllers/' + this.name + '.js'),
                {name: this.name}
            );
        }
    },

    end: {
        route: function () {
            //TODO: change msg.
            this.log(chalk.cyan('Attention, ') + 'add the controller to config file. ' + chalk.magenta('(./config.js)'));
        }
    }
});
