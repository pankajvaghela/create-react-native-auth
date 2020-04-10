
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var androidGradlePatch = require("./fbAndroidGradlePatch");
var appGradlePatch = require("./fbAppGradlePatch");

async function fbSetup(options){

  console.log("\nFb Login Android Setup start ...");
  
  await addFbAuth(options)

  await manipulateGradleFiles(options);
}


async function addFbAuth(options){

  console.log('adding facebook auth to project');
 
  shell.exec("yarn add react-native-fbsdk");
  console.log('Node Module '+chalk.green("react-native-fbsdk") +' installed.');
}

async function manipulateGradleFiles(options){

  console.log(chalk.dim('patching android gradle files for facebook'));

  let androidGradleFile = `${options._projectDir}/android/build.gradle`;
  let appGradleFile = `${options._projectDir}/android/app/build.gradle`;

  androidGradlePatch(androidGradleFile);
  appGradlePatch(appGradleFile);
}

module.exports = fbSetup;