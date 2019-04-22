"use strict";

module.exports = "\nUsage: ls [OPTION]... [FILE]...\nList information about the FILEs (the current directory by default).\nSort entries alphabetically if none of -tSU nor --sort is specified.\n\n  -a, --all                  do not ignore entries starting with .\n  -A, --almost-all           do not list implied . and ..\n  -d, --directory            list directory entries instead of contents,\n                               and do not dereference symbolic links\n  -f                         do not sort, enable -aU, disable -ls --color\n  -F, --classify             append indicator (one of */=>@|) to entries\n  -h, --human-readable       with -l, print sizes in human readable format\n  -i, --inode                print the index number of each file\n  -l                         use a long listing format\n  -q, --hide-control-chars   print ? instead of non graphic characters\n  -r, --reverse              reverse order while sorting\n  -R, --recursive            list subdirectories recursively\n  -S                         sort by file size\n  -t                         sort by modification time, newest first\n  -U                         do not sort; list entries in directory order\n  -w, --width=COLS           assume screen width instead of current value\n  -x                         list entries by lines instead of by columns\n  -1                         list one file per line\n      --help                 display this help and exit\n\nExit status:\n  0   if OK,\n  1   if minor problems (e.g., cannot access subdirectory),\n  2   if serious trouble (e.g., cannot access command-line argument).\n\nReport ls bugs to <https://github.com/dthree/cash>\nCash home page: <http://cash.js.org/>\n";