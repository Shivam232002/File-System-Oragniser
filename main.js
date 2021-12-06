const path = require("path");
const fs = require("fs");
const heplObj = require('./help') // imported help script
const treeObj = require('./tree ')
const organizeObj = require('./organise')

let inputArr = process.argv.slice(2); // slice is used to extart the commands and path we have passed
//console.log(inputArr) 

let command = inputArr[0]; // organzie , help . tree , default

let types = {
    media: ["mp4", "mkv", "mp3", "jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex"
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organise":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        heplObj.helpFnKey();
        break;
    default:
        console.log("PLEASE ENTER A VALID COMMAND");
        break;
}