const _ = require("lodash");
const fs = require("fs");
const { resolve } = require("path");
const { filePrefix } = require("./filePrefix");

const getFileContent = (path) => fs.readFileSync(path, { encoding: "UTF-8" });

const pathIsDir = (path) => {
  if (!path) return false;

  try {
    const stat = fs.statSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};

const removeDir = (path) => {
  try {
    fs.rmdirSync(path, { recursive: true });
  } catch (e) {}
};

const createDir = (path) => {
  try {
    fs.mkdirSync(path);
  } catch (e) {}
};

const cleanDir = (path) => {
  removeDir(path);
  createDir(path);
};

const pathIsExist = (path) => path && fs.existsSync(path);

const createFile = (pathTo, fileName, content) =>
  fs.writeFileSync(resolve(__dirname, pathTo, `./${fileName}`), `${filePrefix}${content}`, _.noop);

module.exports = {
  createFile,
  pathIsDir,
  cleanDir,
  pathIsExist,
  createDir,
  removeDir,
  getFileContent,
};
