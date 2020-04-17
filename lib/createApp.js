#!/usr/bin/env node

// var fs = require('fs');
var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');

var helpers = require('./helpers');

var defaultOptions = {
  integrations : []
};

function ReactNativeInit(name){
    shell.exec(`npx react-native init ${name} `);
    shell.cd(`${name}`);
}

async function createApp(name, options = defaultOptions){
  options = Object.assign({},defaultOptions, options,);

  console.log("Creating Project ...");
  console.log("\nwith ", options.integrations.toString().replace(",", " & "));

  helpers.clearDir(name, options);
  // await dummyInit(name, options);

  console.log(chalk.dim("Running react-native init ..."));  
  ReactNativeInit(name);
  console.log(chalk.green("\nReact Native init done ..."));

  installDependencies(options);

  console.log(chalk.dim('Copying setup files to src folder... '));
  shell.cp('-R', `${__dirname}/_setup/`,`./src/` );

  Object.keys(helpers.integrations).forEach(async function(integrationKey){
    let integration = helpers.integrations[integrationKey];
    if(integration.enabled){
      if(options.integrations.includes(integration.label)){
        await integration.setup(options);
      }
    }
  })
}

function installDependencies(options){

    let depIntegrations = [], depFirebase = [];
    
    if(options.integrations){
      depIntegrations = getModuleList(options.integrations, helpers.integrations)
    }

    if(options.firebase_services){
      depFirebase = getModuleList(options.firebase_services, helpers.firebase)
    }

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

async function dummyInit(name, options){
  shell.mkdir(`${name}`);
  shell.cd(`${name}`);
  shell.echo(process.cwd());
  shell.echo(__dirname);
//   shell.exec(`npm init -y`);
}

module.exports.createApp = createApp;
