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
  .command('consts')
  .alias('c')
  .option('-p, --path', 'add namespace path/YOUR_CONST')
  .action(function({ path }) {
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

program
  .command('base')
  .alias('b')
  .option('-r, --read', 'read consts from "constatns.js" file?')
  .action(function({ read }) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'path',
          message: "Write path namespace/ACTION_TYPE (leave blank if you don't need that",
          paginated: true,
          when: function() {
            return !read;
          },
        },
        {
          type: 'input',
          name: 'constants',
          message: 'Write constants separated by comma',
          paginated: true,
          when: function() {
            return !read;
          }
        }
      ]).then(function(answers){
        if(read){

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

          createReducer({
            cb: function(status) {
              if (status) {
                const spinner = ora();
                spinner.text =
                  'reducers created successfully';
                spinner.succeed();
              }
            }
          });
        } else {
          createConstants({
            answers,
            cb: function(status) {
              if (status) {
                const spinner = ora();
                spinner.text =
                  'constants created successfully';
                spinner.succeed();
              }
            }
          });

          createActions({
            constants: answers.constants,
            cb: function(status) {
              if (status) {
                const spinner = ora();
                spinner.text =
                  'actions created successfully';
                spinner.succeed();
              }
            }
          });

          createReducer({
            constants: answers.constants,
            cb: function(status) {
              if (status) {
                const spinner = ora();
                spinner.text =
                  'reducers created successfully';
                spinner.succeed();
              }
            }
          });
        }
      });
});

/**
 * parse commander object
 */
program.parse(process.argv);