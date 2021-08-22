import { Client, Intents } from 'discord.js';

const client = new Client({
  intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES,
});

client.once('ready', () => {
  console.log('bot is ready...');
});

client.login('$[token]');
