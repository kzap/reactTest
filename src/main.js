// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var TweetBox = React.createClass({
    getInitialState: function () {
        return {
            text: '',
            photoAdded: false
        };
    },

    handleChange: function(event) {
        this.setState({ 
            text: event.target.value 
        });
    },

    togglePhoto: function(event) {
        this.setState({
            photoAdded: !this.state.photoAdded
        })
    },

    remainingCharacters: function() {
        if (this.state.photoAdded) {
            return 140 - 23 - this.state.text.length;
        } else {
            return 140 - this.state.text.length;
        }
    },

    maxTextChars: function () {
        if (this.state.photoAdded) {
            return 140 - 23;
        } else {
            return 140;
        }
    },

    overflowAlert: function () {
        if (this.remainingCharacters() < 0) {
            var beforeOverflowText = this.state.text.substring(this.maxTextChars() - 10, this.maxTextChars());
            var overflowText = this.state.text.substring(this.maxTextChars());

            return (
                <div className="alert alert-warning">
                    <strong>Oops! Too Long:</strong>
                    &nbsp;...{beforeOverflowText}
                    <strong className="bg-danger">{overflowText}</strong>
                </div>
            );
        } else {
            return '';
        }
    },

    render: function() {
        return (
            <div className="well clearfix">
                { this.overflowAlert() }
                <textarea className="form-control" onChange={this.handleChange}></textarea>
                <br/>
                <span>{ this.remainingCharacters() }</span>
                <button className="btn btn-primary pull-right" disabled={this.remainingCharacters() === 140}>Tweet</button>
                <button className="btn btn-default pull-right" onClick={this.togglePhoto}>
                    {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
                </button>
            </div>
        )
    }
});

ReactDOM.render(
  <TweetBox />,
  document.getElementById('container')
);
