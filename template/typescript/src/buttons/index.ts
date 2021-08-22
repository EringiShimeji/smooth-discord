import { MessageActionRow, MessageOptions } from 'discord.js';
import {
  ButtonInteraction,
  MessageButton,
  MessageButtonOptions,
} from 'discord.js';

type Button = {
  component: MessageButton;
  execute: { (interaction: ButtonInteraction): unknown };
};
