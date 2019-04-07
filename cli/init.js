#!/usr/bin/env node

/**
 * Command Line Interface
 * 
 * TODO: generate constatns, actions, reducers independed
 * and also all in one inquirer
 */

const program = require('commander');
const inquirer = require('inquirer');
// TODO: use other dependency, just adds color to the text for createConstants()
const ora = require('ora');

const { 
  createConstants,
  createReducer,
  createActions
} = require('../lib/generate');

program
  .command('const [folder]')
  .alias('c')
  .option('-p, --path', 'add namespace path/YOUR_CONST')
  .action(function(folder, {  path  }) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'path',
          message: 'namespace path/YOUR_CONST',
          paginated: true,
          when: function() {
            return path;
          }
        },
        {
          type: 'input',
          name: 'constants',
          message: 'separated by comma',
          validate: function(input) {
            // TODO: not starts from nubmer
            return true;
          }
        }
      ]).then(function(answers) {
        createConstants({
          answers,
          folder,
          cb: function(status) {
            if (status) {
              const spinner = ora();
              spinner.text =
                'constants created successfully';
              spinner.succeed();
            }
          }
        });
      });
});

program
  .command('reducer [name]')
  .alias('r')
  .action(function(name) {
    createReducer({
      name,
      cb: function(status) {
        if (status) {
          const spinner = ora();
          spinner.text =
            'reducer created successfully';
          spinner.succeed();
        }
      }
    });
});

program
  .command('actions')
  .alias('a')
  .action(function() {
    createActions({
      cb: function(status) {
        if (status) {
          const spinner = ora();
          spinner.text =
            'actions created successfully';
          spinner.succeed();
        }
      }
    });
});

/**
 * parse commander object
 */
program.parse(process.argv);