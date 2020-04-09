#!/usr/bin/env node

// var fs = require('fs');
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var helpers = require('./helpers');
var androidSetup = require('./android');

var defaultOptions = {
  integrations : []
};

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


async function addGoogleAuth(name, options){

  console.log('adding google auth to project');
  
  if(options.has_google_services_file){
    let copyRes = await copyGoogleServicesJson(options)
  }

  let manGradleRes = await androidSetup(options)

  shell.exec("yarn add @react-native-community/google-signin");
  console.log('Node Module '+chalk.green("@react-native-community/google-signin") +' installed.');

  // console.log(helpers.getProcessDir());
}


async function createApp(name, options = defaultOptions){
  options = Object.assign({},defaultOptions, options,);

  console.log("Creating Project ...");
  console.log("with ", options.integrations.toString().replace(",", " & "));
  
  if(helpers.existsDir(_mData._projectDir)){
    console.log("Deleting existing folder ...");
    shell.rm("-rf", `./${name}`);
  }
  // shell.mkdir(`${name}`);
  // shell.cd(`${name}`);
  // shell.echo(process.cwd());
  // shell.echo(__dirname);
  // shell.exec(`npm init -y`);

  console.log(chalk.blue("Running react-native init ..."));  
  shell.exec(`npx react-native init ${name}`);
  console.log(chalk.blue("\nReact Native init done ..."));
  shell.cd(`${name}`);

  if(options.integrations.includes(helpers.integrations.google)){
    await addGoogleAuth(name, options);
  }
  
  console.log(__dirname);
  
  console.log(chalk.blue('Copying files ... '));
  shell.cp('-R', `${__dirname}/src/`,`./src/` );

}

module.exports.addGoogleAuth = addGoogleAuth;
module.exports.createApp = createApp;
