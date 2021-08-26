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
  constructor(
    public name: string,
    public description: string,
    public type: ApplicationCommandType,
    public execute: (interaction: CommandInteraction) => void,
    public options?: ApplicationCommandOptionData[],
    public defaultPermission?: boolean,
  ) {}
}
