/*
  Used only for saga template
  Other work with that new tool
  at that branch 
  https://github.com/shapkarin/redux-scaffolder/tree/templates
*/

const ejs = require('ejs');
const { format } = require('prettier');

const template = function(tpl, scope){
  const result = ejs
    .render(
      tpl,
      { ...scope, blank: 'someString' },
      {
        rmWhitespace: true
      }
    )
    .replace(/someString/g, '\n');

  const result_formated = format(result, {
    parser: 'babel',
    singleQuote: true
  });

  return result_formated;
}

module.exports = template;