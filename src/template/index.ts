import { writeFile } from 'fs/promises';
import makeDir from 'make-dir';
import { fileParser, templateDirectoryParser } from './parsers';

export const duplicateTemplate = async (
  path: string,
  type: 'javascript' | 'typescript',
  variables: {
    [key: string]: {
      [key: string]: string;
    };
  },
) => {
  const files = await templateDirectoryParser(type);

  for (const file of files) {
    const fileName = file.replace(new RegExp(`.+/template/${type}/`), '');
    const parentName = fileName
      .split('/')
      .filter((_, index) => index !== fileName.split('/').length - 1)
      .join('/');
    const variable = variables[fileName];

    await makeDir(parentName);
    await writeFile(
      `${path}/${fileName}`,
      await fileParser(file, variable ? variable : undefined),
    );
  }
};

export { fileParser, templateDirectoryParser };
