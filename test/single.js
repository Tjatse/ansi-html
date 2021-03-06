var ansiHTML = require('../')
var chalk = require('chalk')
var chai = require('chai')
var expect = chai.expect

var fns = {}
Object.keys(chalk.styles).forEach(function (key) {
  var openCode = chalk.styles[key].open.match(/\u001b\[(\d+)m/)[1]
  var closeCode = chalk.styles[key].close.match(/\u001b\[(\d+)m/)[1]
  var openTag = ansiHTML.tags.open[openCode]

  fns[key] = {
    ansi: function (txt) {
      return chalk[key](txt)
    },
    html: function (txt) {
      return (openTag[0] === '<' ? openTag : ('<span style="' + openTag + ';">')) + txt + ansiHTML.tags.close[closeCode]
    }
  }
})
delete fns['gray']

var txt = 'ansi-html'

describe('single', function () {
  for (var key in fns) {
    it(key, function () {
      var fn = fns[key]
      expect(ansiHTML(fn.ansi(txt))).to.equal(fn.html(txt))
    })
  }
})
