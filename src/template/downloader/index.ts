import { loadAsync } from 'jszip';
import fetch from 'node-fetch';

export const downloadRepositoryFromGithub = async (
  owner: string,
  repository: string,
  branch: string,
) => {
  const response = await fetch(
    `https://codeload.github.com/${owner}/${repository}/zip/${branch}`,
  );
  if (response.status === 200 || response.status === 0) {
    return Object.values((await loadAsync(await response.buffer())).files);
  } else if ((response.status = 404)) {
    throw new Error('Template not found');
  } else {
    throw new Error('Downloading template failed');
  }
};
