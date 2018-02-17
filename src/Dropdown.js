import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from 'semantic-ui-react'

export default class DropDown extends PureComponent {
	PropTypes = {
		options: PropTypes.array.required,
		allowAdditions: PropTypes.bool,
	};

	handleAddition(){}
	handleChange(){}

	render() {
		const { options, title, allowAdditions} = this.props;
		return (
			<div>
				
				<label style={{textAlign: "left", display: "block", fontSize: "12px"}}>{title}

				<Dropdown 
				placeholder={title} 
				size="large"
				fluid search selection options={options}
				allowAdditions={allowAdditions}
				onAddItem={this.handleAddition}
        		onChange={this.handleChange}
				/>
				
				</label>

			</div>
		);
	}
}