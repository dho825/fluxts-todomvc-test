'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');
var ReactComponent = require('../react/ReactComponent');
var MainSection = (function (_super) {
    __extends(MainSection, _super);
    function MainSection() {
        _super.apply(this, arguments);
        this._onToggleCompleteAll = function () {
            TodoActions.toggleCompleteAll();
        };
    }
    MainSection.prototype.render = function () {
        var key;
        var todos;
        var allTodos;
        if (Object.keys(this.props.allTodos).length < 1) {
            return null;
        }
        allTodos = this.props.allTodos;
        todos = [];
        for (key in allTodos) {
            if (allTodos.hasOwnProperty(key)) {
                todos.push((React.createElement(TodoItem, { key: key, todo: allTodos[key] })));
            }
        }
        return ((React.createElement("section", { id: "main" }, React.createElement("input", {
            id: "toggle-all",
            type: "checkbox",
            onChange: this._onToggleCompleteAll,
            checked: this.props.areAllComplete ? 'checked' : ''
        }), React.createElement("label", { htmlFor: "toggle-all" }, "Mark all as complete"), React.createElement("ul", { id: "todo-list" }, todos))));
    };
    MainSection.propTypes = {
        allTodos: ReactPropTypes.object.isRequired,
        areAllComplete: ReactPropTypes.bool.isRequired
    };
    return MainSection;
})(ReactComponent);
;
module.exports = MainSection;
