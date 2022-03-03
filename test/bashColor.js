var ansiHTML = require('../')
var chalk = require('chalk')
var color = require('bash-color')
var chai = require('chai')
var expect = chai.expect
var _ = require('lodash')

var text = 'this text is green'
var bashColorText = color.green(text)
var chalkColorText = chalk.green(text)


describe('bash-color', function () {
  it('bash-color text is equal to chalk text', function () {
    expect(ansiHTML(bashColorText)).to.equal(ansiHTML(chalkColorText))
  })
})
