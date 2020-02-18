const Config = {
  whitelist: [".DS_Store", "Desktop.ini", ".Spotlight-V100", ".Trashes", "test"], // Files / Folders to ignore when sorting
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
};

module.exports = Config;
