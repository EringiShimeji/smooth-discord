import { writeFile } from 'fs/promises';
import { JSZipObject } from 'jszip';
import makeDir from 'make-dir';

export const generateFiles = async (
  rawFiles: JSZipObject[],
  projectPath: string,
  variables?: { [key: string]: { [key: string]: string } },
) => {
  const files = rawFiles.map((file) => ({
    ...file,
    name: file.name.split('/').slice(1).join('/'),
  }));

  for (const file of files.filter((file) => file.dir)) {
    makeDir(`${projectPath}/${file.name}`);
  }
  for (const file of files.filter((file) => !file.dir)) {
    await writeFile(`${projectPath}/${file.name}`, await file.async('string'));
  }
};
