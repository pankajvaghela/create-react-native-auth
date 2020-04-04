'use strict';

const fs = require('fs');
var expect = require('chai').expect;
var shell = require('shelljs');


var createApp = require('../lib/createApp').createApp;

var cPath = process.cwd();


describe('basictests', function() {
  it('it should pass basic test', function() {
    expect(1).to.equal(1); 
  });

  it('it should create app directory', async function(){
    shell.rm('-rf', 'testapp');
    await createApp("testapp",{});

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
