/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');

var KATest = (function() {
  var code = "var answer = 42";

  console.log( JSON.stringify(esprima.parse(code), null, 4) );
  console.log( "Tokenize: " + esprima.tokenize(code) );
}());

module.exports = KATest;
