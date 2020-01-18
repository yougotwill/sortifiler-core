'use strict';

const fsJetpack = require('fs-jetpack');
const parseTorrent = require('parse-torrent');

const SORTLIST = { // order is based on sorting priority
  '_Torrents': ['*.torrent'],
  '_Images': ['*.png', '*.jpg', '*.jpeg', '*.gif', '*.xcf', '*.stl', '*.blend', '*.obj', '*.mtl', '*.3ds', '*.tga', '*.icns', '*.piskel', '*.heif', '*.svg'],
  '_Music': ['*.mp3', '*.wav', '*.flac', '*.m4a', '*.ogg', '*.mid', '*.asd', '*.m3u', '*.pls', '*.alp', '*.asx', '*.bfxrsound', '*.m3u8', '*.als', '*.m4r', '*.opus'],
  '_Videos': ['*.mkv', '*.mp4', '*.mov', '*.mpeg', '*.webm', '*.srt', '*.avi'],
  '_Books': ['*.epub', '*.mobi'],
  '_Scripts': ['*.py', '*.java', '*.class', '*.sh', '*.cs', '*.r', '*.itermcolors', '*.terminal', '*.theme', '*.gbaskin', '*.deltaskin', '*.tmtheme', '*.resbackup', '*.xccolortheme', '*.js', '*.cottheme'],
  '_Web': ['*.html', '*.css', '*.js', '*.htm'],
  '_Programs': ['*.dmg', '*.exe', '*.sh', '*.app', '*.pkg', '*.apk', '*.ipa', '*.gba', '*.gbc', '*.iso', '*.jar', '*.z64'],
  '_Zipped': ['*.zip', '*.rar', '*.7z', '*.tar.gz', '*.tar', '*.gz', '*.unitypackage', '*.prefab', '*.fbx'],
  '_Documents': ['*.pdf', '*.txt', '*.doc', '*.docx', '*.dotx', '*.ppt', '*.pptx', '*.md', '*.json', '*.ods', '*.log', '*.xls', '*.xlsx', '*.ttf']
};

const FILE_TYPES = Object.keys(SORTLIST);

const _move = (object, newFolder, rootFolder, metaFiles = false) => {
  rootFolder.dir(newFolder);
  rootFolder.move(rootFolder.path(object), rootFolder.path(newFolder, object));
  if (metaFiles && rootFolder.exists(`${object}.meta`) !== false) {
    rootFolder.move(rootFolder.path(`${object}.meta`), rootFolder.path(newFolder, `${object}.meta`));
  }
};

const _matchFiles = (extensions, rootFolder) => {
  return rootFolder.find('.', {
    matching: extensions,
    recursive: false,
    ignoreCase: true
  });
};

const sortFiles = (folderPath, metaFiles = false) => {
  const rootFolder = fsJetpack.cwd(folderPath);
  const files = rootFolder.list();
  if (!files) { return; }

  FILE_TYPES.forEach((fileType) => {
    const foundFiles = _matchFiles(SORTLIST[fileType], rootFolder);
    if (foundFiles.length > 0) {
      foundFiles.forEach((file) => {
        if (rootFolder.exists(file) !== 'file') { return; }
        if (fileType === '_Torrents') {
          const torrent = rootFolder.read(rootFolder.path(file), 'buffer');
          try {
            let torrentData = parseTorrent(torrent);
            torrentData = torrentData.name;
            if (rootFolder.exists(torrentData)) {
              _move(torrentData, fileType, rootFolder);
            }
          } catch (e) {
            console.error(e);
          }
        }

        if (fileType === '_Web') {
          const nameIndex = file.indexOf('.htm'); // includes .html
          if (nameIndex === -1) {
            return;
          }
          const fileData = `${file.substr(0, nameIndex)}_files`;
          if (rootFolder.exists(fileData)) {
            _move(fileData, fileType, rootFolder);
          }
        }

        _move(file, fileType, rootFolder, metaFiles);
      });
    }
  });
};

const sortFolders = (folderPath, metaFiles = false) => {
  const rootFolder = fsJetpack.cwd(folderPath);
  const folders = rootFolder.list();
  if (!folders) { return; }

  folders.forEach((folder) => {
    if (FILE_TYPES.indexOf(folder) !== -1) { return; }
    if (rootFolder.exists(folder) !== 'dir') { return; }

    const childFolder = rootFolder.cwd(rootFolder.path(folder));
    let bestFileCount = 0;
    let bestMatch = '';
    FILE_TYPES.forEach((fileType) => {
      const fileCount = _matchFiles(SORTLIST[fileType], childFolder).length;
      if (fileCount > bestFileCount) {
        bestFileCount = fileCount;
        bestMatch = fileType;
      }
    });

    if (bestMatch === '') { return; }
    _move(folder, bestMatch, rootFolder, metaFiles);
  });
};

const sortAll = (folderPath, metaFiles = false) => {
  sortFiles(folderPath, metaFiles);
  sortFolders(folderPath, metaFiles);
};

module.exports = { sortFiles, sortFolders, sortAll };
