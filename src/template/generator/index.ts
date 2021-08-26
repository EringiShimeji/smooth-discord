import { writeFile } from 'fs/promises';
import { JSZipObject } from 'jszip';
import makeDir from 'make-dir';

export const generateFiles = async (
  files: {
    [key: string]: JSZipObject;
  },
  projectPath: string,
) => {
  for (const key in files) {
    const file = files[key];
    if (file.dir) {
      makeDir(file.name.split('/').slice(1).join('/'));
    }
  }
  for (const key in files) {
    const file = files[key];
    if (!file.dir) {
      await writeFile(
        `${projectPath}/${file.name.split('/').slice(1).join('/')}`,
        await file.async('string'),
      );
    }
  }
};
