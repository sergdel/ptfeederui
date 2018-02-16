import React, { Component } from 'react';
import Volume from "./Volume";

class DynamicComponent extends Component {
	state = {};

	components = {
		"Volume" : <Volume/>
	}

	render() {
		switch(this.props.tag) {
			case "Volume": return <Volume/>
			break;
			default : return <div></div>
		}
	}
}

export default DynamicComponent;