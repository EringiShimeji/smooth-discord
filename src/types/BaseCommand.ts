import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
} from 'discord.js';

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
