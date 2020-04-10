#!/usr/bin/env node

// var fs = require('fs');
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var helpers = require('./helpers');
var googleSetup = require('./sGoogle');

var defaultOptions = {
  integrations : []
};


async function clearDir(name, options){
  if(helpers.existsDir(options._projectDir)){
    console.log("Removing existing directory ...");
    shell.rm("-rf", `./${name}`);
  }
}

async function ReactNativeInit(name){
}

async function dummyInit(name, options){
  shell.mkdir(`${name}`);
  shell.cd(`${name}`);
  shell.echo(process.cwd());
  shell.echo(__dirname);
//   shell.exec(`npm init -y`);
}

async function createApp(name, options = defaultOptions){
  options = Object.assign({},defaultOptions, options,);

  console.log("Creating Project ...");
  console.log("\nwith ", options.integrations.toString().replace(",", " & "));

  clearDir(name, options);

//  await dummyInit(name, options);

  console.log(chalk.blue("Running react-native init ..."));  
//   await ReactNativeInit();
  shell.exec(`npx react-native init ${name} `);
  shell.cd(`${name}`);

  console.log(chalk.blue("\nReact Native init done ..."));


  if(options.integrations.includes(helpers.integrations.google)){
    await googleSetup(options);
  }
    
  console.log(chalk.blue('Copying setup files to src folder... '));
  shell.cp('-R', `${__dirname}/_setup/`,`./src/` );

}

module.exports.createApp = createApp;
