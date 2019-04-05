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

generate.prototype.createReducer = function({ answers: { some, thing }}){
  try {

  } catch {

  }
};

module.exports = new generate();