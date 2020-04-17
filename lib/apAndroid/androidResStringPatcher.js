"use strict";

var fs = require('fs-extra');
var chalk = require('chalk');


function androidResStringPatcher(filePath, relPath, stringPatcher, options = { label : ''} ) {

  let fileContent = fs.readFileSync(filePath, 'utf8');

  fileContent = stringPatcher(fileContent, options);

  fs.writeFileSync( filePath, fileContent, 'utf8' );

  console.log(chalk.green(`${options.label}: ${relPath || filePath} patched.`));  
}

module.exports = androidResStringPatcher;