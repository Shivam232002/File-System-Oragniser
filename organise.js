let fs = require("fs");
const path = require("path");

function organizeFn(dirpath) {
    let destPath;
    if (dirpath == undefined) {
        console.log("kindly enter the path")
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpath);
        if (doesExist) {
            destPath = path.join(dirpath, "organised_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
        }
        else {
            console.log("kindly enter the correct path")
            return;

        }
    }
    organiseHelper(dirpath, destPath);
}
function organiseHelper(src, dest) {
    let childName = fs.readdirSync(src);
    // console.log(childName)
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]);
        let isfile = fs.lstatSync(childAddress).isFile();
        if (isfile) {
            //    console.log(childName[i]);
            let Category = getCategory(childName[i]);
            console.log("Category of ", childName[i], " is ", Category);
            // console.log(childName[i], "belongs to --> ", Category);
            sendfiles(childAddress, dest, Category);

        }
    }
}
function sendfiles(src, dest, Category) {
    let CategoryPath = path.join(dest, Category);
    console.log(CategoryPath);
    if (fs.existsSync(CategoryPath) == false) {

        fs.mkdirSync(CategoryPath);
    }
    let fileName = path.basename(src);
    let destFilePath = path.join(CategoryPath, fileName);
    fs.copyFileSync(src, destFilePath);
    fs.unlinkSync(src);
    console.log(fileName, "copied to ", Category);
}

function getCategory(name) {
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);
    console.log("extension is ----> ", ext);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }


        }
    }
    return "others";
}

module.exports= {
    organizeKey : organizeFn
}