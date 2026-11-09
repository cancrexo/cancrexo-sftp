const tsc = require('typescript');
const tsConfig = require('../tsconfig.json');

module.exports = {
  process(src, path) {
    // Jest >= 28 exige devolver un objeto con la propiedad "code"
    if (path.endsWith('.ts')) {
      return { code: tsc.transpile(src, tsConfig.compilerOptions, path, []) };
    }
    return { code: src };
  },
};
