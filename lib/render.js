const ejs = require('ejs');
const { format } = require('prettier');

const template = function(tpl, scope){
  const result = ejs
    .render(
      tpl,
      { ...scope, blank: 'someString', br: 'someOther' },
      {
        rmWhitespace: true
      }
    )
    .replace(/someString/g, '\n')
    .replace(/someOther/g, '\n');

  const result_formated = format(result, {
    parser: 'babel',
    singleQuote: true,
    printWidth: 80
  });

  return result_formated;
}

module.exports = template;