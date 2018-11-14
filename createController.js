let controller = process.argv[2];

controller = controller.charAt(0).toUpperCase() + controller.substr(1);

if (!controller) {
  throw new Error('please specify the controller name');
}

const fs = require('fs');

const content = 'import controller from \'../core/controller\';\n\n' +
	'module.exports = class ' +
	controller +
	' extends controller{\n' +
	'\s\sconstructor(req, res) {\n' +
	'\s\s\s\ssuper(req, res);\n' +
	'\s\s}\n\n' +
	'\s\sindex() {\n' +
	'\s\s\s\sthis.res.end("hello, the world");\n' +
	'\s\s}\n' +
	'}';

fs.writeFile('./src/controllers/' + controller + '.js', content, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
