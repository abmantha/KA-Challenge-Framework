/* KATesterJS provides a testing API to verify that student JS code meets
 * prescribed syntactical requirements. This code is compatible with all
 * major, modern browsers, including Google Chrome, Firefox, Safari, and IE.
 * 
 * Dependencies: esprima.js
*/
var esprima = require('esprima');

/* KATester has public method: check(...). This method is responsible for 
 * implementing a recursive traversal through a generated AST generated
 * by esprima of a student's incoming JS code. Recursively building a 
 * syntax string, this method allows a user to specify white list, 
 * black list, and syntax structure requirements. 
 * 
 * The notation of a generated syntax string from generateSyntaxString(): 
 *   a[...] ==> represents the possible subnodes of node a/any node that can have subnodes
 *   a|b ==> represents that nodes a and b are siblings
 */
var KATester = (function() {

  /* Method: check
   * Parameters: String, String, String, String
   * ======================================================================================================================================================
   * This method generates an AST using esprimaJS for a 
   * given student's code and provides functionality to 
   * verify the correctness of the code according to 
   * customizable white list and black list functionality.
   * 
   * This syntax checks for the existence of requirements reprensented 
   * as substrings within whiteList, blackList, and structure using String.indexOf(). 
   * 
   * For code: input is any valid JS string, errors will be thrown by esprima
   * if string is not valid JS syntax - console will display.
   * 
   * For whiteList and blackList: '&&' separates multiple, separate requirements,
   * while maintaining the capability to validate nested structures.
   * 
   * For structure: Does not support '&&' delimeters. Structure
   * must be explicitly defined during input, according to syntax string
   * notation listed above. 
   *
   * Ex: 
   *  - code: regular JS string
   *  - whiteList: ForStatement[IfStatement[]]&&VariableDeclaration 
   *      (Checks for an empty IfStatement, if children exist they must be explicitly defined in the order in which they are intended to appear)
   *  - blackList: WhileStatement[]&&DoWhileStatement[]
   *      (Checks to make sure no empty WhileStatement or empty DoWhileStatements appear, again components and their children must be explicitly
   *      defined in the order in which they appear)
   *  - structure: ForStatement[IfStatement[]]
   *      (Checks for a ForStatement containing an empty IfStatement)
   * 
   * Please make sure all braces match.
   * 
   * Output: Object containing results of the white list, black list, and rough structure checks.
   * 
   */
  check = function( code, whiteList, blackList, structure ) {

    if ( code !== "" ) {
      var codeAST = esprima.parse( code );
      var syntaxString = generateSyntaxString( codeAST, "" );

      var whiteListStructure = whiteList.split("&&");
      var passedWhiteList = "passed";
      for ( var i = 0; i < whiteListStructure.length; i++ ) {
        var req = whiteListStructure[i];
        if ( syntaxString.indexOf(req) === -1 ) {
          passedWhiteList = "failed";
          break;
        }
      }

      var blackListStructure = blackList.split( "&&" );
      var passedBlackList = "passed";
      for ( var i = 0; i < blackListStructure.length; i++ ) {
        var req = blackListStructure[i];
        if ( syntaxString.indexOf(req) !== -1 ) {
          passedBlackList = "failed";
          break;
        }
      }

      var structureTest = syntaxString.indexOf(structure);
      var passedStructureTest = "passed";
      if ( structureTest == -1 ) {
        passedStructureTest = "failed";
      }

      return {
        whiteListResult: passedWhiteList,
        blackListResult: passedBlackList,
        roughStructureResult: passedStructureTest
      };
    }
  }


  /* Method: generateSyntaxString 
   * Parameters: Object, String
   * ======================================================================================================================================================
   * Recursively traverses through AST tree from root node and builds a syntax string of major JS syntax components 
   * compatible with the SpiderMonkey Parser API.
   * 
   * Currently supports: 
   *  1. IfStatement
   *  2. WhileStatement
   *  3. ForStatement
   *  4. ForInStatement
   *  5. DoWhileStatement
   *  6. FunctionDeclaration
   *  7. VariableDeclaration
   *  8. Expressions
   * 
   * The notation of a generated syntax string from generateSyntaxString(): 
   *   a[...] ==> represents the possible subnodes of node a/any node that can have subnodes
   *   a|b ==> represents that nodes a and b are siblings
   * 
   * Only node types are appended to the string.
   */
  generateSyntaxString = function( astNode, syntaxString ) {
    var nodeType = astNode.type;
    if ( astNode.body != undefined || astNode.consequent != undefined ) {
      syntaxString += nodeType + "[";
      var nodeChildren;
      if ( nodeType === "Program" ) {
        nodeChildren = astNode.body;
      } else if ( nodeType === "IfStatement" ) {
        nodeChildren = astNode.consequent.body;
      } else {
        nodeChildren = astNode.body.body;
      }

      for ( var i = 0; i < nodeChildren.length; i++ ) {
        syntaxString = generateSyntaxString( nodeChildren[i], syntaxString );
        if ( i != nodeChildren.length - 1 ) {
          syntaxString += "|";
        }
      } 
      syntaxString += "]";
    } else if ( nodeType === "ExpressionStatement" ) {
      syntaxString += astNode.expression.type;  
    } else if ( nodeType === "VariableDeclaration" ) {
      syntaxString += nodeType;
    }
    
    return syntaxString;
  }

  /* Public method: check */
  return {
    check: check
  };

}());

module.exports = KATester;
