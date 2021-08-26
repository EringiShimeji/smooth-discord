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
}

export class BaseCommand implements IBaseCommand {
  type?: ApplicationCommandType;

  options?: ApplicationCommandOptionData[];

  defaultPermission?: boolean;

  constructor(
    public name: string,
    public description: string,
    public execute: (interaction: CommandInteraction) => void,
    options: {
      type?: ApplicationCommandType;
      options?: ApplicationCommandOptionData[];
      defaultPermission?: boolean;
    },
  ) {
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      }
    }
  }
}
