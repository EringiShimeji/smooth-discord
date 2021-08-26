import { ButtonInteraction, MessageButton } from 'discord.js';

interface IBaseButton {
  component: MessageButton;
  execute: (interaction: ButtonInteraction) => void;
}

export class BaseButton implements IBaseButton {
  constructor(
    public component: MessageButton,
    public execute: (interaction: ButtonInteraction) => void,
  ) {}
}
