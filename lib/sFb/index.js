
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var androidGradlePatch = require("./fbAndroidGradlePatch");
var appGradlePatch = require("./fbAppGradlePatch");
var stringpatch = require('./fbResStringPatch');
var manifestPatch = require('./fbManifestPatch');

async function fbSetup(options){

  console.log("\nFb Login Android Setup start ...");
  
  await addFbAuth(options)

  await manipulateGradleFiles(options);

  await manipulateAndroidSrcFiles(options);

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

async function manipulateAndroidSrcFiles(options){

  console.log(chalk.dim('patching android gradle files for facebook'));

  let androidStrFile = `android/app/src/main/res/values/strings.xml`;
  let manifestPatchFile = `android/app/src/main/AndroidManifest.xml`;

  stringpatch(`${options._projectDir}/${androidStrFile}`, androidStrFile, options);
  manifestPatch(`${options._projectDir}/${manifestPatchFile}`, manifestPatchFile, options);

}
module.exports = fbSetup;