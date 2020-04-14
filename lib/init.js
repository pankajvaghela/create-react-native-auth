#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
var inquirer = require('inquirer');
var clear = require('clear');
var shell = require('shelljs');
// clear();

inquirer.registerPrompt('confirm-extra', require('inquirer-confirm-extra'));

console.log("Lets get some info about your app ...");

var helpers = require('./helpers');
var createApp = require('./createApp').createApp;
let _mData = {
  _initDir : helpers.getProcessDir()
};



var qGoogle = [
  {
    when: (answers) => (answers.integrations.includes(helpers.integrations.google)),
    type:"confirm-extra",
    name:"has_google_services_file",
    message:`You have google-services.json file ready?`,
    defaultValue: true,
  },
  { 
    when: (answers) => (answers.has_google_services_file),
    type: "input", 
    name: "google_services_file", 
    message:"Path or name of google-services.json file : ", 
    default: "google-services.json",
    validate : async function(val){
      return true;  
    },    
  },

];

var qFb = [
  { 
    when: (answers) => (answers.integrations.includes(helpers.integrations.fb)),
    type: "input", 
    name: "fb_app_id", 
    message:"Facebook App ID : ", 
    default: "fb_app_id",
    validate : async function(val){
      return true;  
    },    
  },
  { 
    when: (answers) => (answers.integrations.includes(helpers.integrations.fb)),
    type: "confirm-extra", 
    name: "fb_app_share_media", 
    message:"Will you share Images or Videos from app ?", 
    default: true,   
  },
];

var qFirebase = [
  { 
    when: (answers) => (answers.integrations.includes(helpers.integrations.firebase)),
    type: "checkbox", 
    name: "firebase_services", 
    message:"Select firebase service you need to integrate?",
    choices : helpers.getObjectVals(helpers.firebase)
  },

];

var questions = [
  /* Pass your questions in here */
  { 
    type: "input", 
    name: "name", 
    message:"Name of your app ?", 
    validate : function(val){
      _mData._projectDir = `${helpers.getProcessDir()}/${val}`;
      return val.length > 0; 
    }
  },
  {
    when: (answers) => (helpers.existsDir(_mData._projectDir)),
    type:"confirm-extra",
    name:"name_confirm",
    message:`prompt: ${chalk.dim("Directory already exists. Are you sure to overwrite")} ?`,
    defaultValue: false,
    //TODO: make this false
    validate: (val, answers)=>{
      if(!val){
        console.log("\nProject intialization canceled");
        process.exit();
      }
      return val;
    },
  },
  { 
    type: "checkbox", 
    name: "integrations", 
    message:"Which of following auths you need to integrate?",
    choices : helpers.getObjectVals(helpers.integrations)
  },
  ...qGoogle,
  ...qFb,
  ...qFirebase,
]


function inquire(){
  inquirer
  .prompt(questions)
  .then(async (answers) => {
    console.log({...answers, ..._mData});
    await createApp(answers.name,  {...answers, ..._mData});
    console.log(chalk.green('created app ') + chalk.green(`${answers.name}!`));
  })
  .catch(error => {
    console.log(error);
    
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

}

inquire();
  var answers = {
    name: 't2',
    name_confirm: true,
    integrations: [ 'Google Login' ],
    has_google_services_file: false,
    _initDir: '/workspace/create-react-native-social',
    _projectDir: '/workspace/create-react-native-social/t1'
  };  

  
// createApp(answers.name,  {...answers});