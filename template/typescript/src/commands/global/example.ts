import { BaseCommand } from 'easy-discord';

const exampleGlobalCommand = new BaseCommand({
  name: 'exampleGlobal',
  description: 'This is a example global command.',
  isSlashCommand: true,

  execute: (interaction) => {
    interaction.reply('This is a example global command.');
  },
});

export default exampleGlobalCommand;
