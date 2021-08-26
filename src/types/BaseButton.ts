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
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        this[key] = params[key];
      }
    }
  }
}
