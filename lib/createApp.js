#!/usr/bin/env node

// var fs = require('fs');
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var g2js = require('gradle-to-js/lib/parser');
var helpers = require('./helpers');

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
    console.log(`\n ${chalk.blue(fileIn)} File not found`);
    process.exit()
  }


  let destPath =  `${options._projectDir}/android/app/google-services.json`;
  // Async with promises:
  return fs.copy(filePath, destPath)
  .then(() => {
    console.log('google-service.json file copied!')
    return true;
  })
  .catch(err => console.error(err))
}

async function manipulateGradleFiles(options){
  
  let androidGradleFile = `${options._projectDir}/android/build.gradle`;
  let appGradleFile = `${options._projectDir}/android/app/build.gradle`;
  
  let s1 = `googlePlayServicesAuthVersion = "16.0.1"`;

}

async function addGoogleAuth(name, options){

  console.log('adding google auth to project');
  
  if(options.has_google_services_file){
    let copyRes = await copyGoogleServicesJson(options)
  }

  let manGradleRes = await manipulateGradleFiles(options)

  shell.exec("yarn add @react-native-community/google-signin");
  console.log('Node Module '+chalk.blue("@react-native-community/google-signin") +' installed.');

  // console.log(helpers.getProcessDir());
}


async function createApp(name, options = defaultOptions){
  options = Object.assign({},defaultOptions, options,);

  console.log("Creating Project ...");
  console.log("with ", options.integrations.toString().replace(",", " & "));
  
  
  // shell.mkdir(`${name}`);
  // shell.cd(`${name}`);
  // shell.echo(process.cwd());
  // shell.echo(__dirname);
  // shell.exec(`npm init -y`);

  console.log(chalk.blue("React / init start ..."));  
  shell.exec(`npx react-native init ${name}`);
  console.log(chalk.blue("\nReact Native init done ..."));
  shell.cd(`${name}`);

  if(options.integrations.includes(helpers.integrations.google)){
    await addGoogleAuth(name, options);
  }
  
  console.log(chalk.blue('Copying files ... '));
  shell.cp('-R', `${__dirname}/src/`,`./src/` );

}

module.exports.addGoogleAuth = addGoogleAuth;
module.exports.createApp = createApp;

//Regex to edit some strings
// const codeToObscure = /console.warn\([\s\S].*`Require cycle:[^;]*;/gi
// const problemFilePath = './node_modules/metro/src/lib/polyfills/require.js'
// const problemFileContent = fs.readFileSync(problemFilePath, 'utf8')
// fs.writeFileSync(
//   problemFilePath,
//   problemFileContent.replace(codeToObscure, ''),
//   'utf8'
// )


  // return fs.promises.access( `${helpers.getProcessDir()}/${file}`).then((s, error) => {
        
  //   if(error){
  //     console.log("\nFile doesn't exist in current directory");
  //     return false;
  //   }
    
  //   console.log("\nFile found in current directory");
  //   return `${helpers.getProcessDir()}/${file}`;
  // }).then((fPath)=>{

  //   if(fPath) return fPath;

  //   return fs.promises.access(file, error => {            
  //     if(error){
  //       console.log("\nFile doesn't exist at given path");
  //       return false;
  //     }
  
  //     console.log("\nFile found at given path");
  //     return file;
  //   }); 
  // }).then((fPath)=> {

  //   if(!fPath){
  //     console.log("\nFile not found");
  //     return false;
  //   }
  //   console.log("\nFile found");

  //   return true;

  // });