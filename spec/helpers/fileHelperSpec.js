describe('fileHelper', () => {
  let fileHelper = null;

  beforeEach(() => {
    fileHelper = require('../../src/helpers/fileHelper');
  });

  it('getFileExtension', () => {
    expect(fileHelper.getFileExtension('a.jpg')).toBe('jpg');
    expect(fileHelper.getFileExtension('/test/test/b.bmp')).toBe('bmp');
  });

  it('fileExists', () => {
    const testPath = __dirname + '/../controllers/';

    expect(fileHelper.fileExists(testPath + 'controller.js')).toBe(true);
    expect(fileHelper.fileExists(testPath + 'controllersErr.js')).toBe(false);
  });

  it('folderExists', () => {
    const testPath = __dirname + '/../controllers/';
    expect(fileHelper.folderExists(testPath)).toBe(true);
    expect(fileHelper.folderExists(testPath + 'fdaslj')).toBe(false);
  });
});
