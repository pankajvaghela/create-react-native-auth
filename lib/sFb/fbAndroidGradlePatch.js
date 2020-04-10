"use strict";

var fs = require('fs-extra');
var chalk = require('chalk');
// const utils = require('./util');


function fbAndroidGradlePatch(buildGradlePath) {

  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

  buildGradle = mavenPatch(buildGradle);

  fs.writeFileSync( buildGradlePath, buildGradle, 'utf8' );

  console.log(chalk.green(`Fb: ${buildGradlePath} patched.`));  
}

function mavenPatch(gradleContent){

    let pForCheck = `(buildscript[\\S\\s]*repositories ?{[\\S\\s]*mavenCentral\\(\\))`;
    let pForAdd =`((repositories ?{[\\S\\s]*google\\(\\))([\\s\\S]*dependencies))`;

  if(!(new RegExp(pForCheck)).test(gradleContent)){
    return gradleContent.replace(new RegExp(pForAdd), function(match, p1, p2, p3){
        return `${p2}\n        mavenCentral()${p3}`;
    });
  }

  return gradleContent;
}

module.exports = fbAndroidGradlePatch;