var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var ReactComponent = (function (_super) {
    __extends(ReactComponent, _super);
    function ReactComponent(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.getInitialState = function () {
            return _this.getDerivedInitialState();
        };
        this.props = props;
        this.context = context;
        this.state = this.getInitialState();
        this.getInitialState = null;
    }
    ReactComponent.prototype.getDerivedInitialState = function () {
        return null;
    };
    return ReactComponent;
})(React.Component);
module.exports = ReactComponent;
