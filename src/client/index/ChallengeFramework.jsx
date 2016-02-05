/* ChallengeFramework.jsx provides a front-end testing UI for the KATester API.
 * This component was designed using ReactJS.
 * 
 * User can specify a syntax challenge, input code, and have results displayed dynamically
 * without delay or blocking. This is compatible in all major browsers.
 * 
 * Special Notes: When modifying an existing challenge within one of the three form fields at the top of the page, 
 * please click inside the code textarea and simply press enter at the end of the text box. This will allow the code's
 * state to update and reflect test results below. 
 * 
 * To refresh and start over, simply click Reset All! to begin again.
 * 
 * Dependencies: React.js, KATester.js
 */
var React = require('react');
var ReactDOM = require('react-dom');
var KATester = require('./KATester.js');

var ChallengeFramework = React.createClass({

  /* Store state relating to: 
      - inputted code 
      - white list test string
      - black list test string
      - rough structure test string
      - white list result
      - black list result
      - rough structure result
  */
  getInitialState: function() {
    return {
      code: "",
      whiteListTest: "",
      blackListTest: "",
      roughStructureTest: "",
      whiteListResult: "",
      blackListResult: "",
      roughStructureResult: ""
    }
  },

  updateWhiteListTest: function(e) {
    this.setState({
      whiteListTest: e.target.value
    });
  },

  updateBlackListTest: function(e) {
    this.setState({
      blackListTest: e.target.value
    });
  },

  updateRoughStructureTest: function(e) {
    this.setState({
      roughStructureTest: e.target.value
    });
  },

  /* This method checks the validity of the code with respect to specified syntax requirements.
   * Results are stored in this.state accordingly. Due to esprima's computational speed, user can 
   * input code and have results displayed simultaneously and dynamically.  */
  runTests: function(e) {
    var results = KATester.check( e.target.value, this.state.whiteListTest, this.state.blackListTest, this.state.roughStructureTest );
    this.setState({
      code: e.target.value,
      whiteListResult: results.whiteListResult,
      blackListResult: results.blackListResult,
      roughStructureResult: results.roughStructureResult
    });
  },

  reset: function() {
    this.setState({
      code: "",
      whiteListTest: "",
      blackListTest: "",
      roughStructureTest: "",
      whiteListResult: "",
      blackListResult: "",
      roughStructureResult: ""
    });
  },

  render: function() {
    return (
      <div className="ChallengeFramework">
        <nav className="navbar khan-navbar">
          <img src="img/leaf-green.svg" className="khan-img img-responsive" alt="Khan Academy"/> 
          <h1> Khan Academy CS Challenge Framework </h1>
        </nav>
        <div className="container-fluid">
          <div className="row challenge-editor">
            <div className="col-md-4">
              WhiteList Check:  <input className="form-control" type="text" value={this.state.whiteListTest} onChange={this.updateWhiteListTest} />
            </div>
            <div className="col-md-4">
              BlackList Check: <input className="form-control" type="text" value={this.state.blackListTest} onChange={this.updateBlackListTest} />
            </div>
            <div className="col-md-4">
              Rough Structure Check: <input type="text" className="form-control" value={this.state.roughStructureTest} onChange={this.updateRoughStructureTest} />
            </div>
          </div>

          <div className="row coding-editor">
            <div className="col-md-6 col-md-offset-3">
              <textarea className="form-control" rows="10" type="text" value={this.state.code} onChange={this.runTests}/>
              <button className="btn btn-success" onClick={this.reset} type="button">Reset</button>
            </div>
          </div>

          <div className="row challenge-results">
            <div className="col-md-3 col-md-offset-1">
              <h3> WhiteList Result: {this.state.whiteListResult} </h3>
            </div>
            <div className="col-md-3">
              <h3> BlackList Result: {this.state.blackListResult} </h3>
            </div>
            <div className="col-md-3">
              <h3> RoughStructure Result: {this.state.roughStructureResult} </h3> 
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ChallengeFramework;
