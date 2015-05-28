var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');
var events = require('events');
var CHANGE_EVENT = 'change';
var _todos = {};
function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}
function updateAll(updates) {
    var id;
    for (id in _todos) {
        if (_todos.hasOwnProperty(id)) {
            update(id, updates);
        }
    }
}
function destroy(id) {
    delete _todos[id];
}
function destroyCompleted() {
    var id;
    for (id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}
var TodoStoreStatic = (function (_super) {
    __extends(TodoStoreStatic, _super);
    function TodoStoreStatic() {
        _super.apply(this, arguments);
    }
    TodoStoreStatic.prototype.areAllComplete = function () {
        var id;
        for (id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    };
    TodoStoreStatic.prototype.getAll = function () {
        return _todos;
    };
    TodoStoreStatic.prototype.emitChange = function () {
        this.emit(CHANGE_EVENT);
    };
    TodoStoreStatic.prototype.addChangeListener = function (callback) {
        this.on(CHANGE_EVENT, callback);
    };
    TodoStoreStatic.prototype.removeChangeListener = function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    };
    return TodoStoreStatic;
})(events.EventEmitter);
var TodoStore = new TodoStoreStatic();
AppDispatcher.register(function (action) {
    var text;
    switch (action.actionType) {
        case 0 /* TODO_CREATE */:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            TodoStore.emitChange();
            break;
        case 4 /* TODO_TOGGLE_COMPLETE_ALL */:
            if (TodoStore.areAllComplete()) {
                updateAll({ complete: false });
            }
            else {
                updateAll({ complete: true });
            }
            TodoStore.emitChange();
            break;
        case 5 /* TODO_UNDO_COMPLETE */:
            update(action.id, { complete: false });
            TodoStore.emitChange();
            break;
        case 1 /* TODO_COMPLETE */:
            update(action.id, { complete: true });
            TodoStore.emitChange();
            break;
        case 6 /* TODO_UPDATE_TEXT */:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, { text: text });
            }
            TodoStore.emitChange();
            break;
        case 2 /* TODO_DESTROY */:
            destroy(action.id);
            TodoStore.emitChange();
            break;
        case 3 /* TODO_DESTROY_COMPLETED */:
            destroyCompleted();
            TodoStore.emitChange();
            break;
        default:
    }
});
module.exports = TodoStore;
