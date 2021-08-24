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
import packagesList from './packagesList';
import { duplicateTemplate } from './template';
import { BaseButton } from './types/BaseButton';
import { BaseCommand } from './types/BaseCommand';

export {
  getGlobalCommands,
  getGuildCommands,
  getButtons,
  registerGlobalCommands,
  registerGuildCommands,
  BaseButton,
  BaseCommand,
};

const exec = promisify(child_process.exec);

const main = () => {
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
        isUsingTS,
        token,
      }: {
        projectName: string;
        description: string;
        packageManager: 'npm' | 'yarn';
        isUsingTS: boolean;
        token: string;
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
          name: 'isUsingTS',
          type: 'confirm',
          message: 'Do you want to use TypeScript?',
          default: false,
        },
        {
          name: 'token',
          type: 'input',
          message: 'Enter your bot token',
          default: '/* Your bot token here */',
        },
      ]);

      const projectPath = await makeDir(
        `${currentPath}/${projectName === currentDirName ? '' : projectName}`,
      );

      // ファイルを生成中と表示
      const spinner = ora('Generating files...').start();

      // ファイルを複製
      await duplicateTemplate(
        `${projectPath}`,
        isUsingTS ? 'typescript' : 'javascript',
        {
          'package.json': {
            name: projectName,
            description,
            mainDirectory: isUsingTS ? 'dist' : 'src',
          },
          'src/app.ts': {
            token,
          },
        },
      );

      spinner.succeed();

      // ダウンロード中と表示
      spinner.text = 'Downloading packages...';
      spinner.start();

      // npm install
      // yarn add
      const savePackages = packagesList
        .filter((module) => !module.saveDev)
        .filter((module) => {
          if (module.onlyTS) {
            if (isUsingTS) return true;
            return false;
          }
          return true;
        })
        .map((module) => module.name)
        .join(' ');
      if (savePackages) {
        await exec(
          `${packageManager} ${
            packageManager === 'npm' ? 'install' : 'add'
          } ${savePackages}`,
        );
      }

      // npm install -D
      // yarn add -D
      const saveDevPackages = packagesList
        .filter((module) => module.saveDev)
        .filter((module) => {
          if (module.onlyTS) {
            if (isUsingTS) return true;
            return false;
          }
          return true;
        })
        .map((module) => module.name)
        .join(' ');
      if (saveDevPackages) {
        await exec(
          `${packageManager} ${
            packageManager === 'npm' ? 'install' : 'add'
          } -D ${saveDevPackages}`,
        );
      }

      spinner.succeed();
    });

  program.parse(process.argv);
};

export default main;
