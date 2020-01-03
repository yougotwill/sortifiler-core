# SortiFiler

> Get your files sorted. 📚🗂

## Description
An opinionated API to sort your files and folders easily.

**Desktop app coming soon! 🚀**

Everyday you look at your *Desktop/Downloads* folder and think, "Damn I need to clean up this mess". 🤦

That feeling is why this package now exists. 😆

SortiFiler classifies files and folders and moves them into *\_Type* folders for easy access at the root of your chosen directory. 🗃

## Installation

To add SortiFiler to your project use `npm install sortifiler`.

If you are looking to sort your files from the terminal check out [SortiFiler CLI](https://github.com/yougotwill/sortifiler-cli)!

## Usage

```js
const sortifiler = require('sortifiler');

sortifiler.sortAll('~/Desktop');
// sorts your Desktop into _Type folders
```

## API

### sortAll(folderPath, metaFiles?)

Sorts all files and folders in a given directory.

#### folderPath

Type: `string`

The path to the directory you want to sort.

#### metaFiles

Type: `boolean`
Default: `false`

Sort *.meta* files as well.

### sortFiles(folderPath, metaFiles?)

Sorts all files in a given directory.

#### folderPath

Type: `string`

The path to the directory you want to sort.

#### metaFiles

Type: `boolean`
Default: `false`

Sort *.meta* files as well.

### sortFolders(folderPath, metaFiles?)

Sorts all folders in a given directory.

#### folderPath

Type: `string`

The path to the directory you want to sort.

#### metaFiles

Type: `boolean`
Default: `false`

Sort *.meta* files as well.

## How does the sorting work?

- Folders are classified using the best matching *_Type* folder based on the files within that folder (only 1 level down).
- Files are classified as follows:

| _Type Folder | File Extension                           |
| :------------- | :--------------------------------------- |
| _Books         | ".epub", ".mobi"                         |
| _Documents     | ".pdf", ".txt", ".doc", ".docx", ".ppt", ".pptx", ".md", ".json", ".ods", ".log", ".xls", ".xlsx", ".ttf" |
| _Images        | ".png", ".jpg", ".jpeg", ".gif", ".xcf", ".stl", ".blend", "*.obj", "*.mtl", "*.3ds", "*.tga", ".icns" |
| _Music         | ".mp3", ".wav", ".flac", ".m4a", ".ogg", ".mid", ".asd", ".m3u", ".pls", ".alp", ".asx", ".bfxrsound", ".m3u8", ".als", ".m4r" |
| _Programs      | ".dmg", ".exe", ".sh", ".app", ".pkg", ".apk", ".ipa", ".gba", ".gbc" |
| _Scripts       | ".py", ".java", ".class", ".sh", "*.cs", "*.r", ".itermcolors", ".terminal", ".theme", ".gbaskin", ".tmtheme", ".resbackup" |
| _Torrents      | ".torrent"                               |
| _Videos        | ".mkv", ".mp4", ".mov", ".mpeg", ".webm", ".srt", ".avi" |
| _Web           | ".html", ".css", ".js", ".htm"           |
| _Zipped        | ".zip", ".rar", ".7z", ".tar.gz", ".tar", ".gz", "*.unitypackage", "*.prefab", ".fbx" |

- **Note:** This list maybe outdated please check the [SORTLIST](index.js) for the latest info.

## Development

### Contributing

1. Fork it
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

### Requirements / Dependencies

- npm

## Version

0.1.2

## License

[MIT](LICENSE)
