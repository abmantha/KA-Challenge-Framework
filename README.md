# KA-Challenge-Framework
This my Khan Academy JavaScript project source code.

### Running
    git clone https://github.com/abmantha/KA-Challenge-Framework.git
    cd src
    npm start
    
Navigate to localhost:3000 to view the page!

### Specifications
For this project, I used EsprimaJS. After looking at structured.js, I decided Esprima would be an adequate tool to use for this project. While provided performance tests by both Acorn and Esprima vary, I found that Esprima's comprehensive examples and simple documentation to be very helpful and easy to adopt. 

In addition, Esprima supports all modern browsers. Testing on Firefox, Chrome, Safari and IE8+, I did not have any problems with compatibility. However, given that Microsoft has recently decided to halt support for older versions, React has followed suit, so for the future, this editor will only be compatible with IE9+, so an update will be needed. 

Testing for white list, black list and syntax structure consisted of recursively generating a String of node types and their associated subnodes/children.

For example, code that looks like: 
    
    for ( var i = 0; i < 10; i++ ) {
        if( i == 4) {
          console.log( "Hooray!" );
        }
    }
    
will generate the following syntax string: 

    ForStatement[IfStatement[CallExpression]]
    
Sibling nodes are separated with '|'
  
    for ( var i = 0; i < 10; i++ ) {
        if( i == 4) {
          console.log( "Hooray!" );
        }
        console.log( "Hello world!" );
    }
    
generates: 

    ForStatement[IfStatement[CallExpression]|CallExpression]
    
To determine if a syntax string then matches white list and black list requirements, it's as simple as looking every requirement and finding it's indexOf position within the syntax string. For white list functionality, if any requirement returns an index of -1, then we know that this code fails. For black list functionality, if any requirement returns an index of -1, then we know that this code fails. Multiple requirements can be separated by a '&&' delimeter. Please note that to represent ForStatements, WhileStatements, IfStatements, FunctionDeclarations, and the like, you must include both [] brackets, even if their bodies are empty.

To determine the rough structure also involves a similar check, where structures are simply searched for within the syntax string as is. Structures should be able to appear 'roughly' within a given syntax string, meaning searching for a ForStatement containing an IfStatement should return true if a CallExpression or additional structure also exists within the ForStatement block. I hope to develop this functionality soon using RegExp objects. However, I did not have enough time fully implement this check. Right now, parameter structures should appear explicitly the way they are expected to within the code. White list and black list functionality also have nested structure functionality. 

I decided to use ReactJS to render my front-end views as I have recently been developing with ReactJS and have found its simplistic design very easy to use. One major consideration was how to dynamically return test results while a user was inputting new code. Because of Esprima's speed, I was able to store test results in UI state, and update all necessary components that displayed the results on the page accordingly. While user text input in React can be a little cumbersome, I was able to design a simple solution for the purposes of testing my KATester API. 

I tried displaying an AceEditor React component. The particular package I was using was https://www.npmjs.com/package/react-ace. However, I ran into issues managing concurrency and had to resolve to using a simple textarea and simple header tags to display the results. I want to either design a more powerful React text editor using the Web Workers API (or something similar) or perhaps even fork and modify the Khan/Live-Editor repository to display test results directly using the Oh-Noes! functionality.

The application is running on a local node server, pointed to port 3000. Using ejs, I am rendering views through Express routes. This project is a minified version of the stack that we use for Code the Change. While significantly smaller in scope compared to our projects, we have generated boilerplate for our MNEFR stack. (MongoDB, Node, Express, Flux, and React). No database was used for this project and there was no apparent need for Flux. 

### What I would do differently/What I want to extend
* Provide more testing functionality. Right now, major syntax structures are included. However, I want to extend my traversal to handle more components, for exmample Control Statements. 
* Use RegExp objects to allow for more flexibility for input, that way explicit code structure does not have to be listed.
* Enhance the front-end UI.
* Integrate with the Khan Live Editor component, so that test results can appear in side of Oh-Noes! output messages.
* Integrate with StructuredJS. My initial solution involved using the Structured library and simply translating string requirements to valid Structured syntax. However, this was my first time interacting with an AST and I wanted the chance to learn more about tree traversals.

Please let me know if you require any clarification for any point throughout the repository. Thank you so much for this opportunity!
