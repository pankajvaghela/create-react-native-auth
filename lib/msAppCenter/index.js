var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');
var androidResStringPatcher = require('./../apAndroid/androidResStringPatch');
var helpers = require('../helpers')

async function msAppCenterSetup(options){

  console.log("\nMicrosoft AppCenter Setup start ...");

  console.log('installing dependencies');

  shell.exec("yarn add appcenter appcenter-analytics appcenter-crashes --exact");
  console.log('Node Modules '+chalk.green("appcenter, appcenter-analytics, appcenter-crashes") +' installed.');

  let appCenterConfig = JSON.stringify({
    "app_secret" : options.appcenter_app_secret
  });

  let configFileDir = `${options._projectDir}/android/app/src/main/assets`
  if(!fs.existsSync(configFileDir)){
    shell.mkdir('-p', configFileDir);
  }

  let configFile = `android/app/src/main/assets/appcenter-config.json`
  fs.writeFileSync(`${options._projectDir}/${configFile}`, appCenterConfig);
  
  console.log(chalk.dim('created appcenter config file... \n') + chalk.green(configFile));

  patchAndroidRes(options);

  shell.cp('-R', `${__dirname}/otpUtils/`,`./src/otpUtils/` );
  console.log('setup for '+chalk.green("OTP verification setup done."));
    
}


function patchAndroidRes(options){

  console.log(chalk.dim('patching android resource files for appcenter'));

  let androidStrFile = `android/app/src/main/res/values/strings.xml`;

  androidResStringPatcher(`${options._projectDir}/${androidStrFile}`, 
      androidStrFile, 
      androidResStringPatch, 
      { label : "appcenter"});

}


function androidResStringPatch(content, options){

  let pForCheck = `(name="appCenterCrashes_whenToSendCrashes")`;
  let pForAdd =`(<\\/resources>)`;

if(!(new RegExp(pForCheck)).test(content)){
  return content.replace(new RegExp(pForAdd), function(match, p1, p2, p3){
      return (`	
      <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
      <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>\n${p1}
      `);
  });
}

return content;
}

module.exports = msAppCenterSetup;
