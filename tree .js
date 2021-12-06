let fs = require("fs");
const path = require("path");

function treeFn(dirpath) {
    if (dirpath == undefined) {
        console.log("kindly enter the path");
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpath);
        if (doesExist) {
            treeHelper(dirpath, "");
        } else {
            console.log("kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(dirpath, indent) {
    // is file or folder 
    let isfile = fs.lstatSync(dirpath).isFile();
    if (isfile == true) {
        let fileName = path.basename(dirpath);
        console.log(indent + "├── " + fileName)
    }
    else {
        let dirName = path.basename(dirpath);
        console.log(indent + "└── " + dirName);
        let childrens = fs.readdirSync(dirpath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirpath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }


    }
}
module.exports={
    treeKey : treeFn
}