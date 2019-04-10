/* 
  TODO: templae engine
  look that https://github.com/99xt/react-scaffolder/issues/65
*/

const fs = require('fs.extra');
const path = require('path');
// const prettier = require('prettier');

const constTpl = require('./templates/constant');

const trinmAndSplit = constants => constants.replace(/\s/g, '').split(',');

const createConstants = function({ answers: { constants, path: _path }, cb }) {
	try {
    const consts = trinmAndSplit(constants);
    let output = '';
    for(constant of consts){
      output += constTpl(_path, constant);
    }
    fs.writeFileSync(path.join(process.cwd(), 'constants.js'), output, 'utf-8');
    cb(true);
	} catch(e) {
		cb(e);
	}
}

const constsFromFile = function(){
  const file = fs.readFileSync(path.join(process.cwd(), 'constants.js'), 'utf-8');
  const array = file.split('\n');
  const re = /(?<=const )(.*)(?= =)/gm;
  const constsArray = array.map(function(c){
    return c.match(re);
  })
  .filter( item => item )
  .map( item => item[0]);

  return constsArray;
}

const importConsts = function(constsArray){
  let imports = 'import {\n';
  for(const constant of constsArray){
    const isLast = constsArray.indexOf(constant) === constsArray.length - 1
    imports += `  ${constant}${isLast ? '' : ','}\n`;
  }
  imports += "} from './constants';";
  
  return imports;
}

const createReducer = function({
  name = '',
  constants,
  cb
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

      fs.writeFileSync(path.join(process.cwd(), 'reducers.js'), result, 'utf-8');
      cb(true);
    } catch (e){
      cb(e);
    }
};

const createActions = function({ constants, cb }) {
	try{
    const constsArray = constants ? trinmAndSplit(constants) : constsFromFile();
    const imports = importConsts(constsArray);

    let actions = '';
    const actionTpl = c => `\nexport const ACTION_NAME = () => ({\n  type: ${c}\n});`;

    for(constant of constsArray){
      actions += actionTpl(constant);
    }

    const template = fs.readFileSync(path.join(__dirname, 'templates/actions.js'), 'utf-8');
    const result = template
                      .replace(/<imports>/gi, imports)
                      .replace(/<actions>/gi, actions);

    fs.writeFileSync(path.join(process.cwd(), 'actions.js'), result, 'utf-8');
    cb(true);
  } catch (e){
    cb(e);
  }
}

module.exports = {
  createConstants,
  createReducer,
  createActions
};