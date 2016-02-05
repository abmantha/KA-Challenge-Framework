/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');
var _ = require('underscore');

var KATester = (function() {

  // must explicitly define the structure
  check = function( code, whiteList, blackList, structure ) {

    var codeAST = esprima.parse( code );
    var syntaxString = generateSyntaxString( codeAST, "" );

    /* ENHANCE THIS FOR REGEX PARSING CAPABILITY! */

    // return a code object with results
    var whiteListStructure = whiteList.split("&&");
    console.log( "White List Requirement Structure: " + whiteListStructure );
    var passedWhiteList = true;
    for ( var i = 0; i < whiteListStructure.length; i++ ) {
      var req = whiteListStructure[i];
      console.log( "White List requirement: " + req );
      if ( syntaxString.indexOf(req) === -1 ) {
        passedWhiteList = false;
        break;
      }
    }
    console.log( "Whitelist results: " + passedWhiteList );

    var blackListStructure = blackList.split( "&&" );
    console.log( "Black List Requirement Structure: " + blackListStructure );
    var passedBlackList = true;
    for ( var i = 0; i < blackListStructure.length; i++ ) {
      var req = blackListStructure[i];
      console.log( "Black List requirement: " + req );
      if ( syntaxString.indexOf(req) !== -1 ) {
        passedBlackList = false;
        break;
      }
    }
    console.log( "Blacklist results: " + passedBlackList );

    var structureTest = syntaxString.indexOf(structure);
    var passedStructureTest = true;
    if ( structureTest == -1 ) {
      passedStructureTest = false;
    }

    return {
      passedWhiteList: passedWhiteList,
      passedBlackList: passedBlackList,
      passedStructureTest: passedStructureTest
    };
    
  }

  // Syntax String structure
    // [] - represents a single node
    // | - separates sibling nodes

  /* DOES SUPPORT */
  /* 
    1. IfStatement
    2. WhileStatement
    3. ForStatement
    4. ForInStatement
    5. DoWhileStatement
    6. FunctionDeclaration
    7. VariableDeclaration
    8. Expressions
  */
/* EXTEND TO MAINTAIN MORE CODING STRUCTURE */
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
    } else if ( nodeType === "ExpressionStatement" ) { // Node is an expression statement, include it's type
      syntaxString += astNode.expression.type;  
    } else if ( nodeType === "VariableDeclaration" ) {  // Iterate over its declarations and their children
      syntaxString += nodeType;
    }
    
    return syntaxString;
  }

  return {
    check: check
  };

}());

module.exports = KATester;



/* 
  Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
  };

switch (id.length) {
  case 2:
      return (id === 'if') || (id === 'in') || (id === 'do');
  case 3:
      return (id === 'var') || (id === 'for') || (id === 'new') ||
          (id === 'try') || (id === 'let');
  case 4:
      return (id === 'this') || (id === 'else') || (id === 'case') ||
          (id === 'void') || (id === 'with') || (id === 'enum');
  case 5:
      return (id === 'while') || (id === 'break') || (id === 'catch') ||
          (id === 'throw') || (id === 'const') || (id === 'yield') ||
          (id === 'class') || (id === 'super');
  case 6:
      return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
          (id === 'switch') || (id === 'export') || (id === 'import');
  case 7:
      return (id === 'default') || (id === 'finally') || (id === 'extends');
  case 8:
      return (id === 'function') || (id === 'continue') || (id === 'debugger');
  case 10:
      return (id === 'instanceof');
  default:
      return false;
  }
*/
