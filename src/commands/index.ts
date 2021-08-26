import { readdir } from 'fs/promises';
import { Client } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';

export const getGuildCommands = async (
  path: string,
): Promise<BaseCommand[]> => {
  try {
    return await Promise.all(
      (
        await readdir(path)
      ).map(async (fileName) => {
        const { default: command }: { default: BaseCommand } = await import(
          `${path}/${fileName}`
        );

        return command;
      }),
    );
  } catch (error) {
    return [];
  }
};

export const getGlobalCommands = async (
  path: string,
): Promise<BaseCommand[]> => {
  try {
    return await Promise.all(
      (
        await readdir(path)
      ).map(async (fileName) => {
        const { default: command }: { default: BaseCommand } = await import(
          `${path}/${fileName}`
        );

        return command;
      }),
    );
  } catch (error) {
    return [];
  }
};

export const registerGuildCommands = async (
  client: Client,
  commands: BaseCommand[],
) => {
  client.guilds.fetch();
  client.guilds.cache
    .map((guild) => guild)
    .map(async (guild) => {
      await guild.commands.set(commands);
    });
};

export const registerGlobalCommands = async (
  client: Client,
  commands: BaseCommand[],
) => {
  await client.application?.commands.set(commands);
};
