import { ButtonInteraction, MessageButton } from 'discord.js';

interface IBaseButton {
  component: MessageButton;
  execute: (interaction: ButtonInteraction) => void;
}

export class BaseButton implements IBaseButton {
  component: MessageButton;

  execute: (interaction: ButtonInteraction) => void;

  constructor(params: IBaseButton) {
    for (const key in params) {
      this[key] = params[key];
    }
  }
}
