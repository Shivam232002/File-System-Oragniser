//1. First Activity with Node.js

// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

// we will be using built in node modules like fs and path to  create this project

// array ke from mein input jaata hai command line pein

//let input = process.argv[2]
//console.log(input)
// node js treats command line inputs as array and that array is your process array

let path = require("path");
let fs = require("fs");

let inputArr = process.argv.slice(2); // slice is used to extart the commands and path we have passed
//console.log(inputArr) 

let command = inputArr[0]; // organzie , help . tree , default

let types = {
    media: ["mp4", "mkv", "mp3"],
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
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
    case "tree":
        treeFn();
        break;
    case "organise":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("PLEASE ENTER A VALID COMMAND");
        break;
}

function treeFn() {
    console.log("Tree Function Implemented");
}

function organizeFn(dirpath) {
    let destPath;
    if(dirpath == undefined){
        console.log("kindly enter the path")
        return;
    }
    else{
        let doesExist = fs.existsSync(dirpath);
        if(doesExist){
            destPath = path.join(dirpath,"organised_files");
           if(fs.existsSync(destPath) == false){
           fs.mkdirSync(destPath);}
        }
        else{
            console.log("kindly enter the correct path")
            return;

        }
    }
    organiseHelper(dirpath , destPath);   
}
function organiseHelper(src,dest){
    let childName=fs.readdirSync(src);
    // console.log(childName)
    for(let i = 0 ; i <childName.length ; i++){
       let childAddress =  path.join(src,childName[i]);
       let isfile =fs.lstatSync(childAddress).isFile();
       if(isfile){
        //    console.log(childName[i]);
        let Category = getCategory(childName[i]);
        console.log(childName[i],"belongs to --> ",Category);
       } 
    }

    function getCategory(name){
      let ext =  path.extname(name);
        // console.log(ext);
        ext = ext.slice(1);
        for(let type in types){
            let cTypeArray =types[type];
            for(let i = 0 ; i <cTypeArray.length; i++){
                if(ext=cTypeArray[i]){
                    return type;
                }
                return "others";

            }
        }

    }
}
function helpFn(dirpath) {
    console.log(`List of all the commands -
    1)Tree Command - node FO.js tree <dirName>
    2) Organize- node FO.js organize <dirName
    3) Help - node FO.js help `); 
}


