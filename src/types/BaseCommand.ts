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

  constructor(params: IBaseCommand) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        this[key] = params[key];
      }
    }
  }
}
