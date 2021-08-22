import root from 'app-root-path';
import {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Client,
  CommandInteraction,
} from 'discord.js';
import { readdirSync } from 'fs';

interface IBaseCommand {
  name: string;
  description: string;
  type?: ApplicationCommandType;
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  execute: (interaction: CommandInteraction) => void;
  isSlashCommand?: boolean;
}

export class BaseCommand implements IBaseCommand {
  name: string;
  description: string;
  type: ApplicationCommandType;
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  execute: (interaction: CommandInteraction) => void;
  isSlashCommand?: boolean;

  constructor(params: IBaseCommand) {
    for (const key in params) {
      this[key] = params[key];
    }
  }
}

export const getGuildCommands = async () => {
  const path = `${root}/dist/commands/guild`;

  return await Promise.all(
    readdirSync(path).map(async (fileName) => {
      const { default: command } = await import(`${path}/${fileName}`);

      return command;
    }),
  );
};

export const getGlobalCommands = async () => {
  const path = `${root}/dist/commands/global`;

  return await Promise.all(
    readdirSync(path).map(async (fileName) => {
      const { default: command } = await import(`${path}/${fileName}`);

      return command;
    }),
  );
};

export const registerGuildCommands = async (
  client: Client,
  commands: BaseCommand[],
) => {
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    client.guilds.fetch();
    for (const guild of client.guilds.cache.map((guild) => guild)) {
      await guild.commands.set(commands);
    }
  }
};

export const registerGlobalCommands = async (
  client: Client,
  commands: BaseCommand[],
) => {
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    await client.application.commands.set(commands);
  }
};
