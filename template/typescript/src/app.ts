import { Client, Intents } from 'discord.js';
import {
  getButtons,
  getGlobalCommands,
  getGuildCommands,
} from 'smooth-discord';
import {
  registerGuildCommands,
  registerGlobalCommands,
} from 'smooth-discord/dist/commands';
import { BaseButton } from 'smooth-discord/dist/types/BaseButton';
import { BaseCommand } from 'smooth-discord/dist/types/BaseCommand';

const commands: { guild: BaseCommand[]; global: BaseCommand[] } = {
  guild: [],
  global: [],
};
let buttons: BaseButton[] = [];

const client = new Client({
  intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES,
});

client.once('ready', async () => {
  commands.guild = await getGuildCommands();
  commands.global = await getGlobalCommands();

  await registerGuildCommands(client, commands.guild);
  await registerGlobalCommands(client, commands.global);

  buttons = await getButtons();

  console.log('bot is ready...');
});

client.login('$[token]');
