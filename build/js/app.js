///<reference path="../typings/tsd.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ImageViewer = require('./imageViewer');
var React = require('react/addons');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
        this.state = {
            photoIndex: 0,
            inputText: '1'
        };
    }
    App.prototype.handleChange = function (addend) {
        var newIndex = this.state.photoIndex + addend, maxPhotos = 3;
        // clamp [0 thru maxPhotos-1]
        newIndex = Math.max(0, Math.min(maxPhotos - 1, newIndex));
        this.setState({
            photoIndex: newIndex,
            inputText: (newIndex + 1).toString()
        });
    };
    App.prototype.handleKeyPress = function (e) {
        if (e.key == 'Enter') {
            this.setState({
                photoIndex: parseInt(this.state.inputText, 10) - 1
            });
        }
    };
    App.prototype.handleInputChange = function (e) {
        this.setState({ inputText: e.target.value });
    };
    App.prototype.render = function () {
        var self = this;
        return (React.createElement("div", { className: "app" }, React.createElement("div", { className: "title" }, "Picture Purrfect"), React.createElement(ImageViewer, { index: this.state.photoIndex }), React.createElement("div", null, React.createElement("button", {
            disabled: this.state.photoIndex == 0,
            onClick: this.handleChange.bind(this, -1)
        }, "Previous"), React.createElement("input", { type: "text", value: this.state.inputText, onChange: self.handleInputChange, onKeyPress: this.handleKeyPress.bind(this) }), React.createElement("button", {
            disabled: this.state.photoIndex == 2,
            onClick: this.handleChange.bind(this, 1)
        }, "Next"))));
    };
    return App;
})(React.Component);
React.render((React.createElement(App, null)), document.body);
