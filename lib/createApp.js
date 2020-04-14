#!/usr/bin/env node

// var fs = require('fs');
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var helpers = require('./helpers');
var googleSetup = require('./sGoogle');
var fbSetup = require('./sFb');
var firebaseSetup = require('./firebase');

var defaultOptions = {
  integrations : []
};

async function clearDir(name, options){
  if(helpers.existsDir(options._projectDir)){
    console.log("Removing existing directory ...");
    shell.rm("-rf", `./${name}`);
  }
}

function ReactNativeInit(name){
    shell.exec(`npx react-native init ${name} `);
    shell.cd(`${name}`);
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

//   clearDir(name, options);

await dummyInit(name, options);

  console.log(chalk.dim("Running react-native init ..."));  
//   ReactNativeInit(name);
  console.log(chalk.green("\nReact Native init done ..."));

  installDependencies(options);

  console.log(chalk.dim('Copying setup files to src folder... '));
  shell.cp('-R', `${__dirname}/_setup/`,`./src/` );

  if(options.integrations.includes(helpers.integrations.firebase.label)){
    await firebaseSetup(options);
  }

  if(options.integrations.includes(helpers.integrations.google.label)){
    await googleSetup(options);
  }

  if(options.integrations.includes(helpers.integrations.fb.label)){
    await fbSetup(options);
  }
}

function installDependencies(options){

    let depIntegrations = getModuleList(options.integrations ,helpers.integrations)
    let depFirebase = getModuleList(options.firebase_services ,helpers.firebase)

    let allDependencies = [...depIntegrations, ...depFirebase];
    let dep = `yarn add ${allDependencies.join(" ")}`;

    console.log(chalk.dim('\nInstalling required dependencies... '));
    shell.exec(dep);
    console.log(chalk.green(`\nInstalled required dependencies...  \n${ allDependencies.join("\n")}\n`));

}

function getModuleList(selected, fromList){
    let modules = Object.keys(fromList).filter(i => {
        return selected.includes(fromList[i].label);
    }).map(i => fromList[i].module);

    return modules;
}
module.exports.createApp = createApp;
