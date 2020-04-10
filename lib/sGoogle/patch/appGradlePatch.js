"use strict";

var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');
// const semver = require('semver');
const semverLte = require('semver/functions/lte');
const semverCoerce = require('semver/functions/coerce');
const utils = require('./util');


function appGradlePatch(buildGradlePath) {

  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');

  buildGradle = patchAppCompat(buildGradle);
  buildGradle = patchImpProject(buildGradle);
  buildGradle = _pluginPatch(buildGradle);

  fs.writeFileSync( buildGradlePath, buildGradle, 'utf8' );

  console.log(chalk.green(`${buildGradlePath} patched.`));  
}


// implementation fileTree(dir: "libs", include: ["*.jar"])
// implementation "com.facebook.react:react-native:+"
// implementation "com.android.support:appcompat-v7:23.0.1"
// implementation(project(":react-native-google-signin"))

// apply plugin: 'com.google.gms.google-services' // <--- this should be the last line
const depConfigs = ['compile', 'api', 'implementation'];
const depOrConfigs = depConfigs.join('|');


let dep = {
  appcompat : {
    name :  `com.android.support:appcompat-v7`,
    ver :  `23.0.1`,
    val :  `com.android.support:appcompat-v7:23.0.1`
  }
}

// implementation "com.android.support:appcompat-v7:23.0.1"
function patchAppCompat(gradleContent){

  let dependency = dep.appcompat;

  let patternMatch = `((${depOrConfigs}) ?['"]((${dependency.name}):(${utils.dependencyVerPattern}))['"])`;

  // let patternSingle = utils.getDependencyPattern(patches.dependencies.gservices.name);
  let patternWhole = "((dependencies {\\s*)([\\w\\S\\n ]*com.facebook.react:react-native[\\S\\t ]*\\n))";


  if ((new RegExp(patternMatch)).test(gradleContent)) {
    // return patchReplaceVer(gradleContent, patches.dependencies.gservices);
    return gradleContent.replace(new RegExp(patternMatch, "g"), function(match, p1, p2, p3, p4, p5, offset, input, groups){
      let ver = p5;
      if(semverLte(semverCoerce(ver), dependency.ver)){
        ver = dependency.ver;
      }
      return `implementation "${p4}:${ver}"`;
    });
  
  }else{
    return gradleContent.replace(new RegExp(patternWhole, "g"), function(match, p1, p2, p3, p4, offset, input, groups){        

      let patchStr = `${p1}\n    implementation "${dependency.val}"\n`;
      return patchStr;
    });
  }

}


// implementation(project(":react-native-google-signin"))
function patchImpProject(gradleContent){
    let patternGoogleSign = `(implementation\\(project\\(":react-native-google-signin"\\)\\))`;


    if(!(new RegExp(patternGoogleSign, "g")).test(gradleContent)){
        let dependency = dep.appcompat;
        let patternMatch = `((${depOrConfigs}) ?['"]((${dependency.name}):(${utils.dependencyVerPattern}))['"])`;

        return gradleContent.replace(new RegExp(patternMatch, "g"), function(match){
            return `${match}\n    implementation(project(":react-native-google-signin"))`;
        });
    }
    return gradleContent;
}

// apply plugin: 'com.google.gms.google-services' // <--- this should be the last line
function _pluginPatch(gradleContent){
  let pattern = `apply plugin: ?['"]com.google.gms.google-services['"]`;

  if(!(new RegExp(pattern)).test(gradleContent)){
      gradleContent += `\napply plugin: 'com.google.gms.google-services'`
  }

  return gradleContent;
}


module.exports = appGradlePatch;
