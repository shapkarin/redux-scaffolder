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


const result_ejs_formated = format(result_ejs, {
  parser: "babel",
  singleQuote: true
});

console.log(result_ejs_formated);
