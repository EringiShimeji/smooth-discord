import {
  ButtonInteraction,
  MessageButton,
  MessageSelectMenu,
} from 'discord.js';

interface IBaseSelectMenu {
  component: MessageSelectMenu;
  execute: (interaction: ButtonInteraction) => void;
}

export class BaseSelectMenu implements IBaseSelectMenu {
  constructor(
    public component: MessageSelectMenu,
    public execute: (interaction: ButtonInteraction) => void,
  ) {}
}
