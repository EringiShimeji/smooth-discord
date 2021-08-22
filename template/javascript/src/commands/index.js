import root from 'app-root-path';
import { readdirSync } from 'fs';

export const getGuildCommands = async () => {
  const path = `${root}/src/commands/guild`;

  return await Promise.all(
    readdirSync(path).map(async (fileName) => {
      const { default: command } = await import(`${path}/${fileName}`);

      return command;
    }),
  );
};

export const getGlobalCommands = async () => {
  const path = `${root}/src/commands/global`;

  return await Promise.all(
    readdirSync(path).map(async (fileName) => {
      const { default: command } = await import(`${path}/${fileName}`);

      return command;
    }),
  );
};

export const registerGuildCommands = async (client, commands) => {
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    client.guilds.fetch();
    for (const guild of client.guilds.cache.map((guild) => guild)) {
      await guild.commands.set(commands);
    }
  }
};

export const registerGlobalCommands = async (client, commands) => {
  const slashCommands = commands.filter((command) => command.isSlashCommand);

  if (slashCommands.length) {
    await client.application.commands.set(commands);
  }
};
