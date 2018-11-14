const model = process.argv[2];

if (!model) {
  throw new Error('please specify the model name');
}

const fs = require('fs');
const content = 'import model from \'../core/model.js\';\n\n' +
    'module.exports = class ' +
    model +
    ' extends model{\n' +
    '\tconstructor() {\n' +
    '\t\tsuper();\n' +
    '\t}\n' +
    '}';

fs.writeFile('./src/models/' + model + '.js', content, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
