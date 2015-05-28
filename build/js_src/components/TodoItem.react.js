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
var TodoTextInput = require('./TodoTextInput.react');
var ReactComponent = require('../react/ReactComponent');
var cx = require('react/lib/cx');
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        var _this = this;
        _super.apply(this, arguments);
        this._onToggleComplete = function () {
            TodoActions.toggleComplete(_this.props.todo);
        };
        this._onDoubleClick = function () {
            _this.setState({ isEditing: true });
        };
        this._onSave = function (text) {
            TodoActions.updateText(_this.props.todo.id, text);
            _this.setState({ isEditing: false });
        };
        this._onDestroyClick = function () {
            TodoActions.destroy(_this.props.todo.id);
        };
    }
    TodoItem.prototype.getDerivedInitialState = function () {
        return {
            isEditing: false
        };
    };
    TodoItem.prototype.render = function () {
        var todo = this.props.todo;
        var input;
        if (this.state.isEditing) {
            input = (React.createElement(TodoTextInput, {
                className: "edit",
                onSave: this._onSave,
                value: todo.text
            }));
        }
        return ((React.createElement("li", {
            className: cx({
                'completed': todo.complete,
                'editing': this.state.isEditing
            }),
            key: todo.id
        }, React.createElement("div", { className: "view" }, React.createElement("input", {
            className: "toggle",
            type: "checkbox",
            checked: todo.complete,
            onChange: this._onToggleComplete
        }), React.createElement("label", { onDoubleClick: this._onDoubleClick }, todo.text), React.createElement("button", { className: "destroy", onClick: this._onDestroyClick })), input)));
    };
    TodoItem.propTypes = {
        todo: ReactPropTypes.object.isRequired
    };
    return TodoItem;
})(ReactComponent);
;
module.exports = TodoItem;
