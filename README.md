# Sortifiler

> Get your files sorted. 📚🗂

## Description
An opinionated API to sort your files and folders easily.

**Desktop app coming soon! 🚀**

Everyday you look at your *Desktop/Downloads* folder and think, "Damn I need to clean up this mess". 🤦

That feeling is why this package now exists. 😆

Sortifiler classifies files and folders and moves them into *\_Type* folders for easy access at the root of your chosen directory. 🗃

## Installation

To add Sortifiler to your project use `npm install sortifiler`.

If you are looking to sort your files from the terminal check out [Sortifiler CLI](https://github.com/yougotwill/sortifiler-cli)!

## Usage

```js
const sortifiler = require('sortifiler');

sortifiler.sortAll('~/Desktop');
// sorts your Desktop into _Type folders
```

## API

### sortAll(folderPath)

Sorts all files and folders in a given directory.

#### folderPath

Type: `string`

The path to the directory to be sorted.

### sortFiles(folderPath)

Sorts all files in a given directory.

#### folderPath

Type: `string`

The path to the directory to be sorted.

### sortFolders(folderPath)

Sorts all folders in a given directory.

#### folderPath

Type: `string`

The path to the directory to be sorted.

### config({ whitelist, rules })

Override the default configuration found in [config.js](src/config.js).

#### whitelist

Type: `string[]`

An array of the files and folders  to be ignored.

#### rules

Type: `object`

An object containing the rules used when sorting.

## How does the sorting work?

Sorting works based on rules. An example of a rule would be
```
"Folder Name": ["*.fileExtension", "*.fileExtension2", "*.fileExtension"]
```
- By default Sortifiler uses various *_Type* folders as seen below.
- Folders are classified using the best matching *_Type* folder based on the files within the folder (not recursive).
- The default rules that come with Sortifiler are as follows:

| _Type Folder | File Extensions                           |
| :------------- | :--------------------------------------- |
| _Books         | "*.epub", "*.mobi"                         |
| _Documents     | "*.pdf", "*.txt", "*.doc", "*.docx", "*.ppt", "*.pptx", "*.md", "*.json", "*.ods", "*.log", "*.xls", "*.xlsx", "*.ttf" |
| _Images        | "*.png", "*.jpg", "*.jpeg", "*.gif", "*.xcf", "*.stl", "*.blend", "*.obj", "*.mtl", "*.3ds", "*.tga", "*.icns" |
| _Music         | "*.mp3", "*.wav", "*.flac", "*.m4a", "*.ogg", "*.mid", "*.asd", "*.m3u", "*.pls", "*.alp", "*.asx", "*.bfxrsound", "*.m3u8", "*.als", "*.m4r" |
| _Programs      | "*.dmg", "*.exe", "*.sh", "*.app", "*.pkg", "*.apk", "*.ipa", "*.gba", "*.gbc" |
| _Scripts       | "*.py", "*.java", "*.class", "*.sh", "*.cs", "*.r", "*.itermcolors", "*.terminal", "*.theme", "*.gbaskin", "*.tmtheme", "*.resbackup" |
| _Torrents      | "*.torrent"                               |
| _Videos        | "*.mkv", "*.mp4", "*.mov", "*.mpeg", "*.webm", "*.srt", "*.avi" |
| _Web           | "*.html", "*.css", "*.js", "*.htm"           |
| _Zipped        | "*.zip", "*.rar", "*.7z", "*.tar.gz", "*.tar", "*.gz", "*.unitypackage", "*.prefab", "*.fbx" |

- **Note:** The default rules are constantly updated so please check [config.js](src/config.js) for the latest set of rules.

## Settings

Sortifiler comes with the follow settings by default:
**NOTE:** The top rules take priority. E.g. The rules for torrent files will take priority over images, music, and videos.

```json
{
  whitelist: [".DS_Store", "Desktop.ini", ".Spotlight-V100", ".Trashes"], // Files / Folders to ignore when sorting
  rules: { // The rules used when sorting files.
    "_Torrents": ["*.torrent"],
    "_Images": ["*.png", "*.jpg", "*.jpeg", "*.gif", "*.xcf", "*.stl", "*.blend", "*.obj", "*.mtl", "*.3ds", "*.tga", "*.icns", "*.piskel", "*.heif", "*.svg"],
    "_Music": ["*.mp3", "*.wav", "*.flac", "*.m4a", "*.ogg", "*.mid", "*.asd", "*.m3u", "*.pls", "*.alp", "*.asx", "*.bfxrsound", "*.m3u8", "*.als", "*.m4r", "*.opus"],
    "_Videos": ["*.mkv", "*.mp4", "*.mov", "*.mpeg", "*.webm", "*.srt", "*.avi"],
    "_Books": ["*.epub", "*.mobi"],
    "_Scripts": ["*.py", "*.java", "*.class", "*.sh", "*.cs", "*.r", "*.itermcolors", "*.terminal", "*.theme", "*.gbaskin", "*.deltaskin", "*.tmtheme", "*.resbackup", "*.xccolortheme", "*.js", "*.cottheme"],
    "_Web": ["*.html", "*.css", "*.js", "*.htm"],
    "_Programs": ["*.dmg", "*.exe", "*.sh", "*.app", "*.pkg", "*.apk", "*.ipa", "*.gba", "*.gbc", "*.iso", "*.jar", "*.z64"],
    "_Zipped": ["*.zip", "*.rar", "*.7z", "*.tar.gz", "*.tar", "*.gz", "*.unitypackage", "*.prefab", "*.fbx"],
    "_Documents": ["*.pdf", "*.txt", "*.doc", "*.docx", "*.dotx", "*.ppt", "*.pptx", "*.md", "*.json", "*.ods", "*.log", "*.xls", "*.xlsx", "*.ttf"]
  }
}
```

You can override Sortifiler's settings in multiple ways:
  - Project-level settings: Change the project's settings in this [config file](src/config.js).
  - Function-level settings: You can pass an arbitrary settings object via the `config` function, these settings have the highest priority.

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

## References

- Structure for user configuration files inspired by [bump](https://github.com/fabiospampinato/bump)
