/* 
  TODO: templae engine
  https://github.com/shapkarin/redux-scaffolder/issues/1
  https://github.com/shapkarin/redux-scaffolder/tree/templates
*/

const fs = require('fs.extra');
const path = require('path');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const writeAsync = promisify(writeFile);

const constTpl = require('./templates/constant');

const trinmAndSplit = constants => constants.replace(/\s/g, '').split(',');

const createConstants = async function({ answers: { constants, path: _path } }) {
	try {
    const consts = trinmAndSplit(constants);
    let output = '';
    for(constant of consts){
      output += constTpl(_path, constant);
    }
    // fs.writeFileSync(path.join(process.cwd(), 'constants.js'), output, 'utf-8');
    await writeAsync(path.join(process.cwd(), 'constants.js'), output, 'utf-8');
    return true;
	} catch(e) {
		return e;
	}
}

const constsFromFile = function(){
  const file = fs.readFileSync(path.join(process.cwd(), 'constants.js'), 'utf-8');
  const array = file.split('\n');
  const re = /(?<=const )(.*)(?= =)/g;
  const constsArray = array.map(c => c.match(re)[0])

  return constsArray;
}

const importConsts = function(constants){
  let imports = 'import {\n';
  for(const constant of constants){
    const isLast = constants.indexOf(constant) === constants.length - 1;
    imports += `  ${constant}${isLast ? '' : ','}\n`;
  }
  imports += "} from './constants';";
  
  return imports;
}

const createReducer = async function({
  name = '',
  constants
}){
    try{
      const constsArray = constants ? trinmAndSplit(constants) : constsFromFile();
      const imports = importConsts(constsArray);

      let cases = '';
      const casesTpl = c => `    case ${c}:\n      return {\n        ...state\n      };\n`;
      for(constant of constsArray){
        cases += casesTpl(constant);
      }

      const template = fs.readFileSync(path.join(__dirname, 'templates/reducers.js'), 'utf-8');
      const result = template
                      .replace(/<imports>/gi, imports)
                      .replace(/<cases>/gi, cases.replace(/^    /, '').substring(0, cases.length - 5))
                      .replace(/<name>/gi, name);

      await writeAsync(path.join(process.cwd(), 'reducers.js'), result,'utf-8' );
      return true;
    } catch (e){
      return e;
    }
};

const createActions = async function({ constants, cb }) {
	try{
    const constsArray = constants ? trinmAndSplit(constants) : constsFromFile();
    const imports = importConsts(constsArray);

    let actions = '';
    const actionTpl = c => {
      const isLast = constsArray.indexOf(c) === constsArray.length - 1
      return `export const ACTION_NAME = () => ({\n  type: ${c}\n});${isLast ? '' : '\n\n'}`;
    }

    for(constant of constsArray){
      actions += actionTpl(constant);
    }

    const template = fs.readFileSync(path.join(__dirname, 'templates/actions.js'), 'utf-8');
    const result = template
                      .replace(/<imports>/gi, imports)
                      .replace(/<actions>/gi, actions);

    await writeAsync(path.join(process.cwd(), 'actions.js'), result, 'utf-8');
    return true;
  } catch (e){
    return e;
  }
}

module.exports = {
  createConstants,
  createReducer,
  createActions
};