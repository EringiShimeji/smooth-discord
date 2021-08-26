import child_process from 'child_process';
import { promisify } from 'util';
import { Command } from 'commander';
import { prompt } from 'inquirer';
import makeDir from 'make-dir';
import ora from 'ora';
import { getButtons } from './buttons';
import {
  getGlobalCommands,
  getGuildCommands,
  registerGlobalCommands,
  registerGuildCommands,
} from './commands';
import { getSelectMenus } from './selectMenus';
import { duplicateTemplate, getTemplates } from './template';
import { BaseButton } from './types/BaseButton';
import { BaseCommand } from './types/BaseCommand';
import { BaseSelectMenu } from './types/BaseSelectMenus';

export {
  getButtons,
  getGlobalCommands,
  getGuildCommands,
  registerGlobalCommands,
  registerGuildCommands,
  getSelectMenus,
  BaseButton,
  BaseCommand,
  BaseSelectMenu,
};

const exec = promisify(child_process.exec);

const main = async () => {
  const program = new Command();
  program
    .command('init')
    .description('create a new project')
    .action(async () => {
      const currentPath = process.cwd();
      const currentDirName = currentPath.split('\\').slice(-1)[0];
      const {
        projectName,
        description,
        packageManager,
        botToken,
        templateName,
      }: {
        projectName: string;
        description: string;
        packageManager: 'npm' | 'yarn';
        botToken: string;
        templateName: string;
      } = await prompt([
        {
          name: 'projectName',
          type: 'input',
          message: 'Enter your project name',
          default: currentDirName,
        },
        {
          name: 'description',
          type: 'input',
          message: 'Enter your project description',
        },
        {
          name: 'packageManager',
          type: 'list',
          message: 'Choose your package manager',
          choices: ['npm', 'yarn'],
        },
        {
          name: 'botToken',
          type: 'input',
          message: 'Enter your bot token',
          default: '/* Your bot token here */',
        },
        {
          name: 'templateName',
          type: 'list',
          message: 'Choose your favorite template',
          choices: await getTemplates(),
        },
      ]);

      const projectPath = await makeDir(
        `${currentPath}/${projectName === currentDirName ? '' : projectName}`,
      );

      // ファイルを生成中と表示
      const spinner = ora('Downloading template...').start();

      // ファイルを複製
      await duplicateTemplate(templateName, {
        path: projectPath,
        name: projectName,
        description,
        botToken,
      });

      spinner.succeed();

      // ダウンロード中と表示
      spinner.text = 'Downloading packages...';
      spinner.start();

      // npm install
      // yarn add

      await exec(
        `${packageManager} ${packageManager === 'npm' ? 'install' : ''}`,
      );

      spinner.succeed();
    });

  program.parse(process.argv);
};

export default main;
