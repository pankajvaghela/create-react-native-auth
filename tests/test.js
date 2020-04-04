'use strict';

var expect = require('chai').expect;

var sum = require('../lib/init');

describe('basictests', function() {
  it('it should pass basic test', function() {
    expect(1).to.equal(1); 
  });
  it('it should return sum of numbers', function() {
    var a = sum(2,3)
    expect(a).to.equal(5); 
  });
});