import { BaseCommand } from 'smooth-discord';

const exampleGuildCommand = new BaseCommand({
  name: 'exampleGuild',
  description: 'This is a example guild command.',
  isSlashCommand: true,

  execute: (interaction) => {
    interaction.reply('This is a example guild command.');
  },
});

export default exampleGuildCommand;
