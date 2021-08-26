import { MessageSelectMenu, SelectMenuInteraction } from 'discord.js';

interface IBaseSelectMenu {
  component: MessageSelectMenu;
  execute: (interaction: SelectMenuInteraction) => void;
}

export class BaseSelectMenu implements IBaseSelectMenu {
  constructor(
    public component: MessageSelectMenu,
    public execute: (interaction: SelectMenuInteraction) => void,
  ) {}
}
