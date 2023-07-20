import { documentDir } from '@tauri-apps/api/path';
import { createDir, readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

export async function getDocumentAppDir() {
  const documentDirPath = await documentDir();

  return join(documentDirPath, "looofix");
}

export async function createDocumentAppDir() {
  const documentDirPath = await getDocumentAppDir()

  try {
    const dir = await readDir(documentDirPath)

    if(dir.length > 0) return console.log("[FS] Directory already exists")
  } catch {
    // Directory does not exist
  }

  await createDir(documentDirPath, { recursive: true });
}
