/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');
var _ = require('underscore');

var KATester = (function() {
  // code = string
  // requirements = array of syntax types ({ Type: functional component objects, Frequency: })
  // 0 - whitelist; 1 - blacklist
  // mustContain = true (whitelist), = false (blacklist)
  matchRequirements = function( code, requirementString, mustContain ) {
    console.log( "Calling mustHave from KATester module" );
    console.log( "Code: " + code );
    console.log( "Requirement String: " + requirementString );

    /* Generate the program's AST */
    var programAST = esprima.parse( code );
    console.log( "ProgramAST: " + JSON.stringify( programAST, null, 4 ) );

    var syntaxString = generateSyntaxString( programAST, "" );

    console.log( "Syntax String: " + syntaxString );
  }

  // Syntax String structure
    // ! = start of block statement
    // : = start of body elements
    // | = sibling
    // . = end of body elements and block statement

  // Currently supports: 
    // WhileStatement
    // ForStatement
    // ExpressionStatement
    // FunctionDeclaration
    // VariableDeclaration

  /* 
    traverseAST = function( astNode, callback ) {
      callback(astNode.type);
      _.each( astNode, function(childNode) {
        if ( typeof childNode === 'object' && childNode !== null ) {
          if ( Array.isArray(childNode) ) {
            _.each(childNode, function(c) {
              traverseAST(c, callback);
            });
          } else {  
            traverseAST(childNode, callback);
          }
        }
      });
    }
  */  
  generateSyntaxString = function( astNode, syntaxString ) {

    var nodeType = astNode.type;
    console.log( "Node type: " + nodeType );

    if ( Array.isArray(astNode.body) && nodeType === "Program" ) {  // program or block statement
      for ( var i = 0; i < astNode.body.length; i++ ) {
        syntaxString = generateSyntaxString( astNode.body[i], syntaxString );
        if ( i != astNode.body.length-1 ) {
           syntaxString += "|";
        }
      }
    } else if ( nodeType === "WhileStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" ) {  // if ( typeof astNode.body === 'object' && astNode !== null ) { // while or for statement or function declaration
      syntaxString += nodeType + ":";
      var nodeBody = astNode.body.body;
      for ( var i = 0; i < nodeBody.length; i++ ) {
        syntaxString = generateSyntaxString( nodeBody[i], syntaxString );
        if ( i != nodeBody.length -1 ) {
          syntaxString += ",";
        }
      }
    } else if ( nodeType === "IfStatement" ) {
      syntaxString += nodeType + ":";
      var nodeBody = astNode.consequent.body;
      for ( var i = 0; i < nodeBody.length; i++ ) {
        syntaxString = generateSyntaxString( nodeBody[i], syntaxString );
        if ( i != nodeBody.length -1 ) {
          syntaxString += ",";
        }
      }

    } else if ( nodeType === "ExpressionStatement" || nodeType === "VariableDeclaration" ) {
      syntaxString += nodeType;
    }
    return syntaxString;

    // if ( typeof node === 'object' && node != null ) {
    //   var nodeType = node.type;
    //   console.log( "Node type: " + nodeType );
    //   if ( nodeType === "ForStatement" || nodeType === "WhileStatement" || nodeType === "FunctionDeclaration" ) {
    //     syntaxString += nodeType + ":";
    //     var childrenInBody = node.body.body;
    //     if ( childrenInBody.length > 0 ) {  // contains children
    //       _.each(childrenInBody, function(child) {
    //         return generateSyntaxString( child, syntaxString ) + "|";
    //       });
    //     }
    //     syntaxString += ".";
    //   } else if ( nodeType === "IfStatement" ) {
    //     syntaxString += nodeType + ":";
    //     var childrenInBody = node.consequent.body;
    //     if ( childrenInBody.length > 0 ) {
    //       _.each(childrenInBody, function(child) {
    //         return generateSyntaxString( child, syntaxString ) + "|";
    //       });
    //     }
    //     syntaxString += ".";
    //   } else if ( nodeType === "ExpressionStatement" || nodeType === "VariableDeclaration" ) {
    //     return syntaxString += nodeType;
    //   }
    // }
    // return syntaxString;
  }

  return {
    matchRequirements: matchRequirements  
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


/* Testing API Information: 
    Main Structures - TODO: Have time to handle all functionality later on
        WhileStatement
        {
          type: WhileStatement,
          body: {
            type: BlockStatement,
            body: []
          }
        }
        
        ForStatement
        {
          type: ForStatement,
          init: {},
          test: {},
          update: {},
          body: {
            type: BlockStatement,
            body: []
          }
        }

        IfStatement
        {
          type: IfStatement
          consequent: {
            type: BlockStatement,
            body: []
          }
        }

        ExpressionStatement
        {
          type: ExpressionStatement,
          expression: {
            // CallExpression, FunctionExpression, etc.
          }
        }

        VariableDeclaration
        {
          type: VariableDeclaration,
          declarations: [
            type: VariableDeclarator,
            id: {},
            init: {
              type: FunctionExpression,
              id: {},
              body: {
                type: BlockStatement,
                body: []
              },
              generator: boolean,
              expression: boolean
            }
          ]
        }

        FunctionDeclaration
        {
          type: FunctionDeclaration,
          id: {
            type: Identifier,
            name: 
          },
          params: [],
          defaults: [],
          body {
            type: BlockStatement,
            body: []
          },
          generator: boolean,
          expression: boolean
        }

  =======================================================

    ESTree Hierarchy

      Statement
        ExpressionStatement
          type, expression --> type, value

        BlockStatement
          type, body
*/
