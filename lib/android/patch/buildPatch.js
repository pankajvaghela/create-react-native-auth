"use strict";

var fs = require('fs-extra');
var shell = require('shelljs');
var chalk = require('chalk');
// const semver = require('semver');
const semverLte = require('semver/functions/lte');
const semverCoerce = require('semver/functions/coerce');
const utils = require('./util');


function makeBuildPatch(buildGradlePath) {

  let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');


  buildGradle = patchExtGAuth(buildGradle);
  buildGradle = dependencyPatch(buildGradle);

  fs.writeFileSync( buildGradlePath, buildGradle, 'utf8' );

  console.log(chalk.green(`${buildGradlePath} patched.`));
  
}

var patches = {
  ext : {
    name :  `googlePlayServicesAuthVersion`,
    ver :  `16.0.1`,
    val :  `googlePlayServicesAuthVersion = "16.0.1"`
  },
  dependencies : {
    gradle : {
      name : `com.android.tools.build:gradle`,
      ver : '3.1.2',
      val : `com.android.tools.build:gradle:3.1.2`
    },
    gservices : {
      name : `com.google.gms:google-services`,
      ver: '4.1.0',
      val: 'com.google.gms:google-services:4.1.0'
    }
  }
}


function patchExtGAuth(gradleContent){

  let pattern = `((googlePlayServicesAuthVersion[= ]*["']?)(${utils.dependencyVerPattern})(['"]?))`;
  let patternWhole = `((ext {\\s*)(\\w*["a-zA-Z()=.:;0-9\\t\\n\\/ ]*))(})`;
  let regexPattern = new RegExp(pattern);
  let dependency = patches.ext;

  if (regexPattern.test(gradleContent)) {
    return gradleContent.replace(regexPattern, function(match, p1, p2, p3, p4, offset, input, groups){
      let ver = p3;
      if(semverLte(semverCoerce(ver), dependency.ver)){
        ver = dependency.ver;
      }
      return `${p2}${ver}${p4}`;
    }); 
  }else{
    return gradleContent.replace(new RegExp(patternWhole), function(match, p1, p2, p3, p4, offset, input, groups){        
      return `${p1}    ${dependency.val}\n    }`;
    });
  }
}

function dependencyPatch(buildGradle){
  buildGradle = patchDepGradle(buildGradle);
  buildGradle = patchDepGoogleServices(buildGradle);

  // buildGradle = patchRepoGoogle(buildGradle);  // dont uncomment this, bugs; 
  return buildGradle;
}


function patchDepGradle(gradleContent){
  return patchReplaceVer(gradleContent, patches.dependencies.gradle);
}

function patchDepGoogleServices(gradleContent){

  let patternSingle = utils.getDependencyPattern(patches.dependencies.gservices.name);
  let patternWhole = `((dependencies {\\s*)(\\w*["a-zA-Z().:;0-9\\t\\n\\/ ]*))(})`;

  if ((new RegExp(patternSingle)).test(gradleContent)) {
    return patchReplaceVer(gradleContent, patches.dependencies.gservices);
  }else{
    return gradleContent.replace(new RegExp(patternWhole), function(match, p1, p2, p3, p4, offset, input, groups){        
      return `${p1}\n        classpath("${patches.dependencies.gservices.val}")\n    }`;
    });
  }
}

function patchReplaceVer(str, dependency){
  let pattern = utils.getDependencyPattern(dependency.name);
  return str.replace(new RegExp(pattern), function(match, p1, p2, p3, offset, input, groups){
    let ver = p3;
    if(semverLte(semverCoerce(ver), dependency.ver)){
      ver = dependency.ver;
    }
    return `${p2}:${ver}`;
  });
}

//# sourceMappingURL=makeBuildPatch.js.map
exports.default = makeBuildPatch;