var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React = require('react/addons');
var ImageViewer = (function (_super) {
    __extends(ImageViewer, _super);
    function ImageViewer() {
        _super.apply(this, arguments);
    }
    ImageViewer.prototype.render = function () {
        return (React.createElement("div", { className: "photos" }, React.createElement(React.addons.CSSTransitionGroup, { transitionName: "photo" }, React.createElement("img", { key: this.props.index, src: "photos/" + this.props.index + '.jpg' }))));
    };
    ImageViewer.defaultProps = { index: 0 };
    ImageViewer.propTypes = { index: React.PropTypes.number.isRequired };
    return ImageViewer;
})(React.Component);
module.exports = ImageViewer;
