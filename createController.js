const controller = process.argv[2];

if (!controller) {
  throw new Error('please specify the controller name');
}

const fs = require('fs');

const content = 'import controller from \'../core/controller\';\n\n' +
	'module.exports = class ' +
	controller +
	' extends controller{\n' +
	'\tconstructor(req, res) {\n' +
	'\t\tsuper(req, res);\n' +
	'\t}\n\n' +
	'\tindex() {\n' +
	'\t\tthis.res.end("hello, the world");\n' +
	'\t}\n' +
	'}';

fs.writeFile('./src/controllers/' + controller + '.js', content, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
