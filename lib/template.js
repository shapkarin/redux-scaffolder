const ejs = require('ejs');
const { format } = require('prettier');

const template = function(tpl, scope){
  const result_ejs = ejs
    .render(
      tpl,
      { ...scope, blank: 'someString' },
      {
        rmWhitespace: true
      }
    )
    .replace(/someString/g, '\n');

  const result_ejs_formated = format(result_ejs, {
    parser: 'babel',
    singleQuote: true
  });

  return result_ejs_formated;
}

module.exports = template;