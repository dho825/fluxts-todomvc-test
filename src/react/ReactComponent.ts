
import React = require('react/addons');

class ReactComponent<P,S> extends React.Component<P,S>
{
  /**
   * @see React.createClass
   */
  constructor(props:P, context:any)
  {
    super(props, context);

    this.props = props;
    this.context = context;
    this.state = this.getInitialState();

    // Nasty trick to avoid warnings.
    this.getInitialState = null;
  }

  public getInitialState = (): S => {
    return this.getDerivedInitialState();
  };

  public getDerivedInitialState(): S {
    return null;
  }
}

export = ReactComponent;

