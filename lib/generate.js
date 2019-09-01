// TODO: decompose
const fs = require("fs.extra");
const path = require("path");
const { writeFile } = require("fs");
const { promisify } = require("util");
const toCamelCase = require('camelcase');
var toConstantCase = require('to-constant-case');
const writeAsync = promisify(writeFile);

const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const store = memFs.create();
// TODO: rename
const fsEditor = editor.create(store);


const constTpl = require("./templates/constant");

// const formatConsts = constants => constants.replace(/\s/g, '_').toUpperCase().split(",");
const formatConsts = constants => constants.split(",").map(c => toConstantCase(c));

const createConstants = async function({
  answers: { constants, path: _path }
}) {
  try {
    const consts = formatConsts(constants);
    let output = "";
    for (constant of consts) {
      output += constTpl(_path, constant);
    }
    // fs.writeFileSync(path.join(process.cwd(), 'constants.js'), output, 'utf-8');
    await writeAsync(path.join(process.cwd(), "constants.js"), output, "utf-8");
    return true;
  } catch (e) {
    return e;
  }
};

const constsFromFile = function() {
  const file = fs.readFileSync(
    path.join(process.cwd(), "constants.js"),
    "utf-8"
  );
  const array = file.split("\n");
  const re = /(?<=const |var )(.*)(?= =)/g;
  const constsArray = array
    .map(c => c.match(re))
    .filter(item => item)
    .map(item => item[0]);

  return constsArray;
};

const importConsts = function(constants) {
  let imports = "import {\n";
  for (const constant of constants) {
    const isLast = constants.indexOf(constant) === constants.length - 1;
    imports += `  ${constant}${isLast ? "" : ","}\n`;
  }
  imports += "} from './constants';";

  return imports;
};

const createReducer = async function({ name = "", constants } = {}) {
  try {
    const constsArray = constants ? formatConsts(constants) : constsFromFile();

    const result = fsEditor.copyTpl(
      path.join(__dirname, "templates/reducers.ejs"),
      path.join(process.cwd(), "reducers.js"),
      {
        constants: constsArray,
        name,
      }
    )
    fsEditor.commit(() => result);

    return true;
  } catch (e) {
    return e;
  }
};

const createActions = async function({ constants } = {}) {
  try {
    const constsArray = constants ? formatConsts(constants) : constsFromFile();
    const imports = importConsts(constsArray);

    let actions = "";
    const actionTpl = c => {
      const isLast = constsArray.indexOf(c) === constsArray.length - 1;
      return `export const ${toCamelCase(c)} = () => ({\n  type: ${c}\n});${
        isLast ? "" : "\n\n"
      }`;
    };

    for (constant of constsArray) {
      actions += actionTpl(constant);
    }

    const template = fs.readFileSync(
      path.join(__dirname, "templates/actions.js"),
      "utf-8"
    );
    const result = template
      .replace(/<imports>/gi, imports)
      .replace(/<actions>/gi, actions);

    await writeAsync(path.join(process.cwd(), "actions.js"), result, "utf-8");
    return true;
  } catch (e) {
    return e;
  }
};

module.exports = {
  createConstants,
  createReducer,
  createActions
};
