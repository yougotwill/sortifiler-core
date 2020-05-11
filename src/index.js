const fsJetpack = require('fs-jetpack');
const parseTorrent = require('parse-torrent');

let CONFIG = require('./config');
let FILE_TYPES = Object.keys(CONFIG.rules);

const config = (userConfig, extend = true) => {
  if (userConfig) {
    userConfig = JSON.parse(userConfig);
    if (extend) { 
      Object.keys(userConfig).forEach((prop) => {
          if (prop == 'whitelist') {
            if (CONFIG.whitelist) {
              CONFIG.whitelist = CONFIG.whitelist.concat(Object.values(userConfig[prop]));
            } else {
              CONFIG.whitelist = userConfig[prop];
            }
          }
          if (prop == 'rules') {
            Object.keys(userConfig[prop]).forEach((rule) => {
              if (CONFIG.rules[rule]) {
                CONFIG.rules[rule] = CONFIG.rules[rule].concat(userConfig[prop][rule]);
              } else {
                CONFIG.rules[rule] = userConfig[prop][rule];
              }
            });
          }
      });
    } else { // overwrites existing config
      CONFIG = userConfig;
    }
    FILE_TYPES = Object.keys(CONFIG.rules); 
  }
};

const _move = (object, newFolder, rootFolder) => {
  rootFolder.dir(newFolder);
  rootFolder.move(rootFolder.path(object), rootFolder.path(newFolder, object));
  if (rootFolder.exists(`${object}.meta`) !== false) {
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

const sortFiles = (folderPath) => {
  const rootFolder = fsJetpack.cwd(folderPath);
  const files = rootFolder.list();
  if (!files) { return; }

  FILE_TYPES.forEach((fileType) => {
    const foundFiles = _matchFiles(CONFIG.rules[fileType], rootFolder);
    if (foundFiles.length > 0) {
      foundFiles.forEach((file) => {
        if (CONFIG.whitelist && CONFIG.whitelist.indexOf(file) !== -1) { return; }
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

        _move(file, fileType, rootFolder);
      });
    }
  });
};

const sortFolders = (folderPath) => {
  const rootFolder = fsJetpack.cwd(folderPath);
  const folders = rootFolder.list();
  if (!folders) { return; }

  folders.forEach((folder) => {
    if (CONFIG.whitelist && CONFIG.whitelist.indexOf(folder) !== -1) { return; }
    if (FILE_TYPES.indexOf(folder) !== -1) { return; }
    if (rootFolder.exists(folder) !== 'dir') { return; }

    const childFolder = rootFolder.cwd(rootFolder.path(folder));
    let bestFileCount = 0;
    let bestMatch = '';
    FILE_TYPES.forEach((fileType) => {
      const fileCount = _matchFiles(CONFIG.rules[fileType], childFolder).length;
      if (fileCount > bestFileCount) {
        bestFileCount = fileCount;
        bestMatch = fileType;
      }
    });

    if (bestMatch === '') { return; }
    _move(folder, bestMatch, rootFolder);
  });
};

const sortAll = (folderPath) => {
  sortFiles(folderPath);
  sortFolders(folderPath);
};

module.exports = { config, sortFiles, sortFolders, sortAll };
