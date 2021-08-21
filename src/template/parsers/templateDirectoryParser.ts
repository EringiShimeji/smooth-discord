import root from 'app-root-path';
import directoryParser from '../../utils/directoryParser';

const templateDirectoryParser = async (
  type: 'javascript' | 'typescript',
): Promise<string[]> => await directoryParser(`${root}/template/${type}`);

export default templateDirectoryParser;
