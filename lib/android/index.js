
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var buildPatch = require("./patch/buildPatch").default;
var dependencyPatch = require("./patch/dependencyPatch").default;


async function androidSetup(options){

  console.log("\nAndroid Setup start ...");
  
  await manipulateGradleFiles(options);

}

async function manipulateGradleFiles(options){

  console.log(chalk.dim('patching android gradle files'));

  let androidGradleFile = `${options._projectDir}/android/build.gradle`;
  let appGradleFile = `${options._projectDir}/android/app/build.gradle`;

  console.log("g1 : ", androidGradleFile );
  buildPatch(androidGradleFile);
  dependencyPatch(appGradleFile);
  

}


module.exports = androidSetup;