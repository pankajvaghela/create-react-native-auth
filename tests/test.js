'use strict';

const fs = require('fs');
var expect = require('chai').expect;
var shell = require('shelljs');


var createApp = require('../lib/createApp').createApp;
var hs = require('../lib/helpers');

var cPath = process.cwd();


describe('helpers tests', function() {
  it('should give path of library', function(){
    expect(cPath+'/lib').to.equal(hs.getLibDir());
  });

  it('should give path of process ', function(){
    expect(cPath).to.equal(hs.getProcessDir());
  });

  it('should tell if dir exists ', function(){
    expect(hs.existsDir('lib')).to.be.true;
    expect(hs.existsDir('testsapp')).to.be.false;
  });
});

describe('integrated tests', function() {

  it('it should create app directory', async function(){
    shell.rm('-rf', 'testapp');
    await createApp("testapp",{});

    expect(fs.existsSync(cPath+'/testapp')).to.be.true;
    shell.rm('-rf', 'testapp');
  });

  it('it should create app directory without 2nd param', async function(){
    shell.rm('-rf', 'testapp');
    await createApp("testapp");

    expect(fs.existsSync(cPath+'/testapp')).to.be.true;
    shell.rm('-rf', 'testapp');
  });

  it('it should init npm project',  function(done){
    // expect(fs.existsSync('packages.json')).to.be.true;

    fs.access("package.json", error => {
      expect(error).to.be.null;
      done();
    });
  });

  it('it should copy files', async function(){
    expect(fs.existsSync('src')).to.be.true;
  });
  it('it should remove app directory', async function(){
    shell.rm('-rf', cPath + '/testapp');
  });

});
