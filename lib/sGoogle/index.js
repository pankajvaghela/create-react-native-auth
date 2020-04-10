
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var androidGradlePatch = require("./patch/androidGradlePatch");
var appGradlePatch = require("./patch/appGradlePatch");

async function googleSetup(options){

  console.log("\nGoogle Login Android Setup start ...");
  
  await addGoogleAuth(options)

  await manipulateGradleFiles(options);
}


async function addGoogleAuth(options){

  console.log('adding google auth to project');
 
  shell.exec("yarn add @react-native-community/google-signin");
  console.log('Node Module '+chalk.green("@react-native-community/google-signin") +' installed.');

  if(options.has_google_services_file){
    let copyRes = await copyGoogleServicesJson(options)
  }
}

async function manipulateGradleFiles(options){

  console.log(chalk.dim('patching android gradle files'));

  let androidGradleFile = `${options._projectDir}/android/build.gradle`;
  let appGradleFile = `${options._projectDir}/android/app/build.gradle`;

  androidGradlePatch(androidGradleFile);
  appGradlePatch(appGradleFile);
}


async function copyGoogleServicesJson(options){

  const fileIn = options.google_services_file;
  
  let filePath;
  let possibleFile = `${options._initDir}/${fileIn}`;
  
  if(fs.existsSync(possibleFile)){
    filePath = possibleFile;
  }else if(fs.existsSync(fileIn)){
    filePath = fileIn ;
  }

  if(!filePath){
    console.log(`\n ${chalk.blue(fileIn)} File not found. Skipping ${chalk.green.bold("Don't forget this!")}`);
    // process.exit();
    return false;
  }

  let destPath =  `${options._projectDir}/android/app/google-services.json`;
  // Async with promises:
  return fs.copy(filePath, destPath)
  .then(() => {
    console.log(chalk.green('google-service.json file copied!'))
    return true;
  })
  .catch(err => console.error(err))
}


module.exports = googleSetup;