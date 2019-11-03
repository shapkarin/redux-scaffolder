#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const { isValid: isValidVar  } = require('var-validator');


const { 
  createConstants,
  createReducer,
  createActions
} = require('../lib/generate');

// todo: rename
const print = (spinner, name, { status, destination }) => {
  if (status) {
    spinner.text = `${name} created successfully at ${destination}`;
    spinner.succeed();
  } else {
    spinner.text = 'error';
    spinner.fail();
  }
}

const { version } = require('../package.json');

program
  .version(version, '-v, --version')

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
          validate: constantsValidation
        }
      ]).then(function(answers) {
        const spinner = ora('generating constants').start();
        createConstants({
          answers
        }).then(response => {
          print(spinner, 'constants', response);
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
    }).then(response => {
      print(spinner, 'reducers', response);
    });
});

program
  .command('actions')
  .alias('a')
  .action(function() {
    const spinner = ora('generating actions').start();
    createActions().then(response => {
      print(spinner, 'actions', response);
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
          },
          validate: constantsValidation
        }
      ]).then(function(answers){
        const spinner_actions = ora('generating actions').start();
        const spinner_reducers = ora('generating reducers').start();

        if(read){
          createActions().then(response => {
            print(spinner_actions, 'actions', response);
          });

          createReducer().then(response => {
            print(spinner_reducers, 'reducers', response);
          });
        } else {
          const spinner_constants = ora('generating constants').start();

          createConstants({
            answers
          }).then(response => {
            print(spinner_constants, 'constants', response);
          });

          createActions({
            constants: answers.constants
          }).then(response => {
            print(spinner_actions, 'actions', response);
          });

          createReducer({
            constants: answers.constants
          }).then(response => {
            print(spinner_reducers, 'reducers', response);
          });
        }
      });
});

function constantsValidation(constants){
  // todo: refact
  const constsArray = constants.replace(/\,$/, '').split(",");
  const options = { enableScope: false, enableBrackets: false }
  const validated = constsArray.map(c => ({ name: c, valid: isValidVar(c.trim(), options) }));
  const notValid = validated.filter(c => !c.valid);
  const notValidLength = notValid.length;

  if(notValidLength > 0){
    const notValidString = notValid.map(c => c.name.trim()).join(', ');
    return `Constant${notValidLength === 1 ? '' : 's'} "${notValidString}" ${notValidLength === 1 ? 'is' : 'are'} not valid`
  } else {
    return true;
  }
}

/**
 * parse commander object
 */
program.parse(process.argv);