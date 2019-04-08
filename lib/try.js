/* 
  https://github.com/99xt/react-scaffolder/issues/65
  and
  https://github.com/shapkarin/redux-scaffolder/issues/1
*/
const ejs = require('ejs');
const { format } = require('prettier');

const fs = require('fs.extra');
const path = require('path');

const tpl = fs.readFileSync(path.join(__dirname, './tpl.ejs'), 'utf-8');

const proptypes = {
  "title*": "string",
  likes: "nubmer",
  //"open*": "bool:false", (todo: tpl)
  "open*": "bool"
};

const result_ejs = ejs.render(
  tpl,
  {
    name: "TestComponent",
    hasProptypes: "yes",
    proptypes,
    //alphabetical: "no",
    hasDefaultProps: "yes"
  },
  {
    rmWhitespace: false
  }
);

var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine({
    envs: ["browser", "mocha"],
    fix: true,
    useEslintrc: false,
    rules: {
        semi: 2
    }
});

// lint myfile.js and all files in lib/
var report = cli.executeOnFiles(["test.js"]);

// output fixes to disk
CLIEngine.outputFixes(report);

// const result_ejs_formated = format(result_ejs, {
//   parser: "babel",
//   singleQuote: true
// });

//console.log(result_ejs_formated);
