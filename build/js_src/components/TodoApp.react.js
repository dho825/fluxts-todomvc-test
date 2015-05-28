'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react/addons');
var TodoStore = require('../stores/TodoStore');
var ReactComponent = require('../react/ReactComponent');
function getTodoState() {
    return {
        allTodos: TodoStore.getAll(),
        areAllComplete: TodoStore.areAllComplete()
    };
}
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        var _this = this;
        _super.apply(this, arguments);
        this._onChange = function () {
            _this.setState(getTodoState());
        };
        this.componentDidMount = function () {
            TodoStore.addChangeListener(_this._onChange);
        };
        this.componentWillUnmount = function () {
            TodoStore.removeChangeListener(_this._onChange);
        };
    }
    TodoApp.prototype.getDerivedInitialState = function () {
        return getTodoState();
    };
    TodoApp.prototype.render = function () {
        return ((React.createElement("div", null, React.createElement(Header, null), React.createElement(MainSection, {
            allTodos: this.state.allTodos,
            areAllComplete: this.state.areAllComplete
        }), React.createElement(Footer, { allTodos: this.state.allTodos }))));
    };
    return TodoApp;
})(ReactComponent);
;
module.exports = TodoApp;
