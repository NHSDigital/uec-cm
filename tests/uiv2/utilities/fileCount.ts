import {readdir} from 'fs/promises';
import {basename} from 'path';

export default async function countFilesInDirectory(dirPath: string, partFileName: string) {
  try {
    const files = await readdir(dirPath);
    const filecount = files.filter(f => basename(f).includes(partFileName)).length;
    return filecount;
  } catch (err) {
    console.log(err);
  }
}
