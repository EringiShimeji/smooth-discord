import { MessageButton } from 'discord.js';
import { BaseButton } from 'smooth-discord';

const exampleButton = new BaseButton({
  component: new MessageButton()
    .setCustomId('exampleButton')
    .setLabel('example')
    .setStyle('PRIMARY'),

  execute: (interaction) => {
    interaction.reply('This is a example button.');
  },
});

export default exampleButton;
