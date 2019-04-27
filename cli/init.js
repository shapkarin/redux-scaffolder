#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');

const { 
  createConstants,
  createReducer,
  createActions
} = require('../lib/generate');

const print = (spinner, name, status) => {
  if (status === true) {
    spinner.text = `${name} created successfully`;
    spinner.succeed();
  } else {
    spinner.text = 'error';
    spinner.fail();
  }
}

program
  .version('1.2.7', '-v, --version')

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
        const spinner = ora('generating constants').start();
        createConstants({
          answers
        }).then(status => {
          print(spinner, 'constants', status);
        });
      });
});

program
  .command('reducer [name]')
  .alias('r')
  .action(function(name) {
    const spinner = ora('generating reducers').start();
    createReducer({
      name
    }).then(status => {
      print(spinner, 'reducers', status);
    });
});

program
  .command('actions')
  .alias('a')
  .action(function() {
    const spinner = ora('generating actions').start();
    createActions().then(status => {
      print(spinner, 'actions', status);
    })
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
          message: 'Write path "namespace/ACTION_TYPE" (you can leave it blank)',
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
        const spinner_actions = ora('generating actions').start();
        const spinner_reducers = ora('generating reducers').start();

        if(read){
          createActions().then(status => {
            print(spinner_actions, 'actions', status);
          });

          createReducer().then(status => {
            print(spinner_reducers, 'reducers', status);
          });
        } else {
          const spinner_constants = ora('generating constants').start();

          createConstants({
            answers
          }).then(status => {
            print(spinner_constants, 'constants', status);
          });

          createActions({
            constants: answers.constants
          }).then(status => {
            print(spinner_actions, 'actions', status);
          });

          createReducer({
            constants: answers.constants
          }).then(status => {
            print(spinner_reducers, 'reducers', status);
          });
        }
      });
});

/**
 * parse commander object
 */
program.parse(process.argv);