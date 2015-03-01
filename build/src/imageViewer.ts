import React = require('react/addons');

interface Props {
	index: number;
}

class ImageViewer extends React.Component<Props, any> {
	static defaultProps: Props = { index: 0 };

    static propTypes: React.ValidationMap<Props> = { index: React.PropTypes.number.isRequired };

	public render(): React.RenderResult {
		return (
		React.createElement("div", {className: "photos"}, 
			React.createElement(React.addons.CSSTransitionGroup, {transitionName: "photo"}, 
				React.createElement("img", {key: this.props.index, 
				     src: "photos/"+this.props.index+'.jpg'})
			)
		) );
	}
}

export = ImageViewer;
