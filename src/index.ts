import { Command } from 'commander';
import { writeFileSync } from 'fs';
import makeDir from 'make-dir';
import { prompt } from 'inquirer';
import child_process from 'child_process';
import packagesList from './packagesList';
import ora from 'ora';
import { promisify } from 'util';
import { duplicateTemplate } from './template';
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
      }: {
        projectName: string;
        description: string;
        packageManager: 'npm' | 'yarn';
        isUsingTS: boolean;
      } = await prompt([
        {
          name: 'projectName',
          type: 'input',
          message: `Enter your project name`,
          default: currentDirName,
        },
        {
          name: 'description',
          type: 'input',
          message: `Enter your project description`,
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
        },
      );

      // ダウンロード中と表示
      spinner.text = 'Downloading packages...';

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
