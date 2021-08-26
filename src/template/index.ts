import { downloadRepositoryFromGithub } from './downloader';
import { generateFiles } from './generator';
import fetch from 'node-fetch';
import child_process from 'child_process';
import { promisify } from 'util';
import { writeFile } from 'fs/promises';
const exec = promisify(child_process.exec);

export const duplicateTemplate = async (
  templateName: string,
  project: {
    path: string;
    name: string;
    description: string;
    botToken: string;
  },
) => {
  try {
    await generateFiles(
      await downloadRepositoryFromGithub(
        'smooth-discord',
        `template-${templateName}`,
        'main',
      ),
      project.path,
    );

    // .envを作成
    await writeFile(`${project.path}/.env`, `BOT_TOKEN=${project.botToken}`);

    // package.jsonを編集
    await exec(
      `npm pkg set name=${project.name} ${
        project.description ? `description="${project.description}"` : ''
      }`,
    );
  } catch (error) {
    throw error;
  }
};

export const getTemplates = async () => {
  return (
    JSON.parse(
      await (await fetch('https://sdjs-api.vercel.app/api/templates')).text(),
    ) as string[]
  ).map((name) => name.replace('template-', ''));
};
