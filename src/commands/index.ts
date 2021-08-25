import { readdir } from 'fs/promises';
import root from 'app-root-path';
import { Client } from 'discord.js';
import { BaseCommand } from '../types/BaseCommand';

export const getGuildCommands = async (): Promise<BaseCommand[]> => {
  const path = `${root}/dist/commands/guild`;

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

export const getGlobalCommands = async (): Promise<BaseCommand[]> => {
  const path = `${root}/dist/commands/global`;

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
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    client.guilds.fetch();
    client.guilds.cache
      .map((guild) => guild)
      .map(async (guild) => {
        await guild.commands.set(commands);
      });
  }
};

export const registerGlobalCommands = async (
  client: Client,
  commands: BaseCommand[],
) => {
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    await client.application?.commands.set(commands);
  }
};
