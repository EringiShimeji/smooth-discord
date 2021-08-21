import { Command } from 'commander';
import { writeFileSync } from 'fs';
import makeDir from 'make-dir';
import { prompt } from 'inquirer';
import child_process from 'child_process';
import packagesList from './packagesList';
import ora from 'ora';
import { promisify } from 'util';
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

      // package.json
      writeFileSync(
        `${projectPath}/package.json`,
        `{
  "name": "${projectName}",
  "version": "0.1.0",
  "description": "${description}",
  "main": "dist/app.js",
  "license": "MIT"
}`,
      );

      // tsconfig.json
      if (isUsingTS) {
        writeFileSync(
          `${projectPath}/tsconfig.json`,
          `{
  "compilerOptions": {
    "module": "commonjs",
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2020",
    "sourceMap": false,
    "outDir": "./dist",
    "rootDir": "./src",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "esModuleInterop": true
  },
  "include": [
    "src/**/*"
  ],
}`,
        );

        // ダウンロード中と表示
        const spinner = ora('Downloading packages...').start();

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
      }
    });

  program.parse(process.argv);
};

export default main;
