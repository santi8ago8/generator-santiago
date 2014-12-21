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

        // Have Yeoman greet the user.
        this.log(yosay(
                chalk.red('Santiago') + ' Route generator!'
        ));


        var prompts = [
            {
                type: 'input',
                default: 'name',
                name: 'name',
                message: 'Name of the route?'
            }
        ];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            var promptRoute = [
                {
                    type: 'input',
                    default: this.name,
                    name: 'route',
                    message: 'Route of the route?'
                }
            ];
            this.prompt(promptRoute, function (props) {
                this.route = props.route;
                done();
            }.bind(this));
        }.bind(this));
    },

    writing: {
        route: function () {

            this.composeWith('santiago:controller', {args: [this.name]});

            this.fs.copyTpl(
                this.templatePath('_route.html'),
                this.destinationPath('./public/html/' + this.name + '.html'),
                {name: this.name}
            );
        }
    },

    end: {
        route: function () {
            this.log(chalk.cyan('Attention, ') + 'add the route to config file. ' + chalk.magenta('(./public/js/app.js)'));
            this.log(".when('/" + this.route + "', {\n  templateUrl: '/html/" + this.name + ".html',\n  controller: '" + this.name + "Ctrl'\n})");
        }
    }
});
