///<reference path="../typings/tsd.d.ts"/>

import ImageViewer = require('./imageViewer');
import React = require('react/addons');

interface State {
  photoIndex?: number;
  inputText?: string;
}

interface InputEvent {
  target: HTMLInputElement;
}

class App extends React.Component<any, State> {

  public state: State = {
			photoIndex: 0,
			inputText: '1'
  };

    public handleChange(addend: number): void {
		var newIndex: number = this.state.photoIndex+addend,
		               maxPhotos: number = 3;
		// clamp [0 thru maxPhotos-1]
		newIndex = Math.max(0, Math.min(maxPhotos-1, newIndex));

		this.setState({
			photoIndex: newIndex,
			inputText: (newIndex+1).toString()
		})
	}

	public handleKeyPress(e:KeyboardEvent): void {
		if (e.key == 'Enter') {
			this.setState({
				photoIndex: parseInt(this.state.inputText, 10)-1
			})
		}
	}

	public handleInputChange(e:InputEvent): void
	{
        this.setState({inputText: e.target.value});
    }

	public render(): React.RenderResult {
	    var self: App = this;
		return (
		React.createElement("div", {className: "app"}, 
			React.createElement("div", {className: "title"}, "Picture Purrfect"), 
			React.createElement(ImageViewer, {index: this.state.photoIndex}), 
			React.createElement("div", null, 
				React.createElement("button", {
					disabled: this.state.photoIndex == 0, 
					onClick: this.handleChange.bind(this, -1)}, "Previous"), 

				React.createElement("input", {type: "text", 
                      value: this.state.inputText, 
                      onChange: self.handleInputChange, 
					onKeyPress: this.handleKeyPress.bind(this)}), 

				React.createElement("button", {
					disabled: this.state.photoIndex == 2, 
					onClick: this.handleChange.bind(this, 1)}, "Next")
			)
		));
	}
}

React.render((React.createElement(App, null)), document.body);
