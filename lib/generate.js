const fs = require('fs.extra');
const path = require('path');
const constTpl = require('./templates/constant');

const generate = function() {};

/**
 * creat redux constants
 * @param {string} asnwers - options provided when creating component
 * @param {function} cb - callback for status return
 */
generate.prototype.createConstants = function({ answers: { constants, path: _path }, folder, cb }) {
	try {
    /* 
      TODO: templae engine
      look that https://github.com/99xt/react-scaffolder/issues/65
    */
    const consts = constants.replace(/\s/g, '').split(',');
    let output = '';
    for(constant of consts){
      output += constTpl(_path, constant);
    }
    console.log(process.cwd());
    fs.writeFileSync(path.join(process.cwd(), 'constants.js'), output, 'utf-8');
    cb(true);
	} catch(e) {
		cb(e);
	}
}

generate.prototype.createReducer = function(
  //{ answers: { hasConstants = true, constants }}
){
    try{
      const file = fs.readFileSync(path.join(process.cwd(), 'constants.js'), 'utf-8');
      const array = file.split('\n');
      const re = /(?<=const )(.*)(?= =)/gm;
      const constsArray = array.map(function(c){
        return c.match(re);
      })
      .filter( item => item )
      .map( item => item[0]);
      let imports = 'import {\n';
      for(constant of constsArray){
        imports += `${constant},\n`;
      }
      imports += "} from './constants';";

      let cases = '';
      const casesTpl = c => `    case ${c}:\n  return { ...state }\n`;
      for(constant of constsArray){
        cases += casesTpl(constant);
      }

      const template = fs.readFileSync(path.join(__dirname, 'templates/reducers.js'), 'utf-8');
      const result = template
                                .replace(/<imports>/gi, imports)
                                .replace(/<cases>/gi, cases.replace(/^    /, ''));

      console.log(result);
    } catch (e){
      console.log(e);
    }
};

const qq = new generate();
qq.createReducer();
module.exports = qq;