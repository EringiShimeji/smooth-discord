import { readdir } from 'fs/promises';
import { BaseSelectMenu } from '../types/BaseSelectMenus';

export const getSelectMenus = async (path: string) => {
  try {
    return await Promise.all(
      (
        await readdir(path)
      ).map(async (fileName) => {
        const { default: command }: { default: BaseSelectMenu } = await import(
          `${path}/${fileName}`
        );

        return command;
      }),
    );
  } catch (error) {
    return [];
  }
};
