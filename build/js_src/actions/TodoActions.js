'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoActionsStatic = (function () {
    function TodoActionsStatic() {
        this.TodoConstants = TodoConstants;
    }
    TodoActionsStatic.prototype.create = function (text) {
        AppDispatcher.dispatch({
            actionType: 0 /* TODO_CREATE */,
            text: text
        });
    };
    TodoActionsStatic.prototype.updateText = function (id, text) {
        AppDispatcher.dispatch({
            actionType: 6 /* TODO_UPDATE_TEXT */,
            id: id,
            text: text
        });
    };
    TodoActionsStatic.prototype.toggleComplete = function (todo) {
        var id = todo.id;
        if (todo.complete) {
            AppDispatcher.dispatch({
                actionType: 5 /* TODO_UNDO_COMPLETE */,
                id: id
            });
        }
        else {
            AppDispatcher.dispatch({
                actionType: 1 /* TODO_COMPLETE */,
                id: id
            });
        }
    };
    TodoActionsStatic.prototype.toggleCompleteAll = function () {
        AppDispatcher.dispatch({
            actionType: 4 /* TODO_TOGGLE_COMPLETE_ALL */
        });
    };
    TodoActionsStatic.prototype.destroy = function (id) {
        AppDispatcher.dispatch({
            actionType: 2 /* TODO_DESTROY */,
            id: id
        });
    };
    TodoActionsStatic.prototype.destroyCompleted = function () {
        AppDispatcher.dispatch({
            actionType: 3 /* TODO_DESTROY_COMPLETED */
        });
    };
    return TodoActionsStatic;
})();
var TodoActions = new TodoActionsStatic();
module.exports = TodoActions;
