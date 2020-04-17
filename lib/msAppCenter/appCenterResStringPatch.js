"use strict";

var fs = require('fs-extra');
var chalk = require('chalk');
// const utils = require('./util');


function fbResStringPatch(filePath, relPath, options) {

  let fileContent = fs.readFileSync(filePath, 'utf8');

  fileContent = stringPatch(fileContent, options);

  fs.writeFileSync( filePath, fileContent, 'utf8' );

  console.log(chalk.green(`Fb: ${relPath || filePath} patched.`));  
}


function stringPatch(content, options){

    let pForCheck = `(name="facebook_app_id")`;
    let pForAdd =`(<\\/resources>)`;

  if(!(new RegExp(pForCheck)).test(content)){
    return content.replace(new RegExp(pForAdd), function(match, p1, p2, p3){
        return `	<string name="facebook_app_id">${options.fb_app_id}</string>\n${p1}`;
    });
  }

  return content;
}

module.exports = fbResStringPatch;