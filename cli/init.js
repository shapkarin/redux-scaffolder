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
  .command('const')
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
  .option('-c, --con', 'read consts from "constatns.js" file?')
  .action(function({ con }) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'constants',
          message: 'Write constants separated by comma',
          paginated: true,
          when: function() {
            return !con;
          }
        }
      ]).then(function(answers){
        if(con){

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
        // console.log(con)
        // console.log('_________________')
        // console.log(answers)
        // createConstants({});
        // createReducer();
        // createActions({});
      });

    // createReducer();
    // createActions({
    //   cb: function(status) {
    //     if (status) {
    //       const spinner = ora();
    //       spinner.text =
    //         'actions created successfully';
    //       spinner.succeed();
    //     }
    //   }
    // });
});

/**
 * parse commander object
 */
program.parse(process.argv);