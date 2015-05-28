'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var ReactComponent = require('../react/ReactComponent');
var ENTER_KEY_CODE = 13;
var TodoTextInput = (function (_super) {
    __extends(TodoTextInput, _super);
    function TodoTextInput() {
        var _this = this;
        _super.apply(this, arguments);
        this._save = function () {
            _this.props.onSave(_this.state.value);
            _this.setState({
                value: ''
            });
        };
        this._onChange = function (event) {
            _this.setState({
                value: event.target.value
            });
        };
        this._onKeyDown = function (event) {
            if (event.keyCode === ENTER_KEY_CODE) {
                _this._save();
            }
        };
    }
    TodoTextInput.prototype.getDerivedInitialState = function () {
        return {
            value: this.props.value || ''
        };
    };
    TodoTextInput.prototype.render = function () {
        return ((React.createElement("input", {
            className: this.props.className,
            id: this.props.id,
            placeholder: this.props.placeholder,
            onBlur: this._save,
            onChange: this._onChange,
            onKeyDown: this._onKeyDown,
            value: this.state.value,
            autoFocus: true
        })));
    };
    TodoTextInput.propTypes = {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    };
    return TodoTextInput;
})(ReactComponent);
;
module.exports = TodoTextInput;
