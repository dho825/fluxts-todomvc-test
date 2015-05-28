'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var ReactComponent = require('../react/ReactComponent');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        _super.apply(this, arguments);
        this._onClearCompletedClick = function () {
            TodoActions.destroyCompleted();
        };
    }
    Footer.prototype.render = function () {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;
        var completed = 0;
        var key;
        var itemsLeft;
        var itemsLeftPhrase;
        var clearCompletedButton;
        if (total === 0) {
            return null;
        }
        for (key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }
        itemsLeft = total - completed;
        itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';
        if (completed) {
            clearCompletedButton = (React.createElement("button", {
                id: "clear-completed",
                onClick: this._onClearCompletedClick
            }, "Clear completed (", completed, ")"));
        }
        return ((React.createElement("footer", { id: "footer" }, React.createElement("span", { id: "todo-count" }, React.createElement("strong", null, itemsLeft), itemsLeftPhrase), clearCompletedButton)));
    };
    Footer.propTypes = {
        allTodos: ReactPropTypes.object.isRequired
    };
    return Footer;
})(ReactComponent);
module.exports = Footer;
