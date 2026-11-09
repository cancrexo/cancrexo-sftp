const path = require('path');

// paths.ts importa host, y host importa vscode, que no existe fuera del editor.
jest.mock('vscode', () => ({}), { virtual: true });
jest.mock('../../src/core', () => ({
  upath: require('../../src/core/upath').default,
}));
jest.mock('../../src/host', () => ({
  pathRelativeToWorkspace: jest.fn(),
  getWorkspaceFolders: jest.fn(),
}));

const { isSubpathOf, getBasePath } = require('../../src/helper/paths');

describe('paths', () => {
  describe('isSubpathOf', () => {
    test('la misma ruta cuenta como dentro', () => {
      const misma = path.resolve('/a/b');
      expect(isSubpathOf(misma, misma)).toBe(true);
    });

    test('un hijo directo y un nieto están dentro', () => {
      const padre = path.resolve('/a/b');
      expect(isSubpathOf(padre, path.join(padre, 'c'))).toBe(true);
      expect(isSubpathOf(padre, path.join(padre, 'c', 'd'))).toBe(true);
    });

    test('un hermano que comparte prefijo no cuenta', () => {
      expect(isSubpathOf(path.resolve('/a/b'), path.resolve('/a/bc/x'))).toBe(false);
    });

    test('el padre de la carpeta no cuenta', () => {
      expect(isSubpathOf(path.resolve('/a/b'), path.resolve('/a'))).toBe(false);
    });

    test('una ruta totalmente distinta es false', () => {
      expect(isSubpathOf(path.resolve('/a/b'), path.resolve('/z/y'))).toBe(false);
    });

    test('.. que sale fuera es false y .. que sigue dentro es true', () => {
      const padre = path.resolve('/a/b');
      expect(isSubpathOf(padre, path.resolve('/a/b/../c'))).toBe(false);
      expect(isSubpathOf(padre, path.resolve('/a/b/c/../d'))).toBe(true);
    });
  });

  describe('getBasePath', () => {
    const workspace = path.resolve('/proyecto');

    test('context undefined devuelve el workspace', () => {
      expect(getBasePath(undefined, workspace)).toBe(workspace);
    });

    test('context vacío devuelve el workspace', () => {
      expect(getBasePath('', workspace)).toBe(workspace);
    });

    test('context relativo devuelve workspace/web', () => {
      expect(getBasePath('web', workspace)).toBe(path.join(workspace, 'web'));
    });

    test('context relativo anidado devuelve la ruta bajo el workspace', () => {
      expect(getBasePath('httpdocs/ahivaesamagra', workspace)).toBe(
        path.join(workspace, 'httpdocs', 'ahivaesamagra')
      );
    });

    // En Windows un absoluto puede ir sin unidad y getBasePath se la añade.
    (process.platform === 'win32' ? test.skip : test)(
      'context absoluto se devuelve sin colgarlo del workspace',
      () => {
        const absoluto = path.resolve('/otro/sitio');
        expect(getBasePath(absoluto, workspace)).toBe(absoluto);
      }
    );
  });
});
