'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var ReactComponent = require('../react/ReactComponent');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        _super.apply(this, arguments);
        this._onSave = function (text) {
            if (text.trim()) {
                TodoActions.create(text);
            }
        };
    }
    Header.prototype.render = function () {
        return ((React.createElement("header", { id: "header" }, React.createElement("h1", null, "todos"), React.createElement(TodoTextInput, {
            id: "new-todo",
            placeholder: "What needs to be done?",
            onSave: this._onSave
        }))));
    };
    return Header;
})(ReactComponent);
;
module.exports = Header;
