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
      return (openTag[0] == '<' ? openTag : ('<span style="' + openTag + ';">')) + txt + ansiHTML.tags.close[closeCode]
    }
  }
})

delete fns['gray']

var txt = 'ansi-html'

describe('chaining', function () {
  var keys = Object.keys(fns)
  for (var i = 0; i < keys.length * 5; i++) {
    var cKeys = _sample(keys)

    var ret = {}
    cKeys.forEach(function (key) {
      var fn = fns[key]
      ret.ansi = fn.ansi(ret.ansi || txt)
      ret.html = fn.html(ret.html || txt)
    })

    it(cKeys.join('.'), function () {
      expect(ansiHTML(this.ansi)).to.equal(this.html)
    }.bind(ret))
  }
})

function _random (min, max) {
  return Math.ceil(10000 * Math.random()) % max + min
}

function _sample (arr, count) {
  if (!count) {
    count = _random(1, 5)
  }
  var len = arr.length
  var ret = []
  for (var i = 0; i < count; i++) {
    var seed = _random(0, len)
    while (ret.indexOf(arr[seed]) >= 0) {
      seed = _random(0, len)
    }
    const v = arr[seed]
    if (v && ret.indexOf(v) < 0) {
      ret.push(v)
    }
  }
  return ret
}