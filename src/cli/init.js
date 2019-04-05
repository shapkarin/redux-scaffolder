/**
 * Command Line Interface
 * 
 * TODO: generate constatns, actions, reducers independed
 * and also all in one inquirer
 */

import program from 'commander';
import inquirer from 'inquirer';
// TODO: use other dependency, just adds color to the text for createConstants()
import ora from 'ora';

import { createConstants, createReducer } from '../lib/generate';

program
  .command('constants [folder]')
  .alias('const')
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
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'constantsFromFile',
          message: 'Read constants from "constants.js" file',
          paginated: true,
          choices: ['yes', 'no']
        }
      ]).then(function(answers) {
        createReducer({
          answers,
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
});


/**
 * parse commander object
 */
program.parse(process.argv);