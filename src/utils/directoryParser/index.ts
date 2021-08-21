import { Dirent } from 'fs';
import { readdir } from 'fs/promises';

const directoryParser = async (path: string): Promise<string[]> =>
  (
    await Promise.all(
      (
        await readdir(path, { withFileTypes: true })
      ).flatMap(async (dirent) => {
        const name = `${path}/${dirent.name}`;

        return dirent.isDirectory() ? await directoryParser(name) : [name];
      }),
    )
  ).flat();

export default directoryParser;
