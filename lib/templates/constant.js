const tpl = (path, constant) => `export const ${constant} = '${path ? `${path}/` : ''}${constant}';\n`;

module.exports = tpl;