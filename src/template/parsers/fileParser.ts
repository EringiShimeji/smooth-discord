import { readFile } from 'fs/promises';

const fileParser = async (
  path: string,
  variables: { [key: string]: string },
): Promise<string> => {
  const content = await readFile(path, { encoding: 'utf-8' });
  let result = '';

  for (const key in variables) {
    if (content.includes(`[${key}]`)) {
      const reg = new RegExp(`(\\$\\[${key}\\])`, 'g');
      result = content.replace(reg, variables[key]);
    }
  }

  return result;
};

export default fileParser;
