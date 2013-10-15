var fs = require('fs'),
    assert = require('assert'),
    rework = require('rework'),
    clone = require('../');

function read(file) {
  return fs.readFileSync('./test/css/' + file + '.css', 'utf8')
}

function test(file, msg, options) {
  if (options === undefined) {
    options = {};
  }
  var out = rework(read(file)).use(clone(options)).toString();
  assert.equal(out, read(file + '.out'), msg + ':\n' + out)
}

test('clone', 'Clone failed')
test('copy', 'Copy failed')
test('clone.multiple', 'Multiple clone failed')
test('clone.and.copy', 'Clone and copy failed')
test('consistent', 'Consistent clone failed')
test('media', 'Media failed')
test('regexp', 'Regexp failed', {regexp: /^foo?$/i})
test('order', 'Order failed')
test('placeholder', 'Placeholder failed')

console.log('All right!')

