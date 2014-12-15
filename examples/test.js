var ansiHTML   = require('../'),
    chalk = require('chalk');

var str = chalk.bold.red('foo') + ' bar';
console.log('[ANSI]', str)
console.log('[HTML]', ansiHTML(str));

str = chalk.bold.red('foo') + ' fin ' + chalk.bold.magenta('foo');
console.log('[ANSI]', str)
console.log('[HTML]', ansiHTML(str));