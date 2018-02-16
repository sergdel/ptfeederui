import React, { Component, PureComponent } from "react";
import { background } from "./colours";
import { Map } from "immutable"
import _ from "lodash";
import VolumeData from "./VolumeData.js";
import VolumeConfigComponent from "./VolumeConfigComponent";
import {
	Button,
	Icon,
	Grid,
	Accordion,
	Form,
	Menu,
	Sidebar,
	Segment,
	Dropdown
} from "semantic-ui-react";

class VolumeComponent extends PureComponent {
	state = {
		config: [],
		value: [],
		searchQuery: null,
		multiple: true,
		search: true
	};

	handleChange = (e, { value }) => this.setState({ value });
	handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
		console.error(error, info);
	}

	render() {
		const {
			selectedOption,
			config,
			value,
			searchQuery,
			multiple,
			search
		} = this.state;

		let options = VolumeData;

		if (this.state.config.length > 0) {
			//reduce available options by what has been added
			options = _.filter(VolumeData, option => {
				if (config.indexOf(option.key) == -1) return option;
			});
			options = _.without(options, undefined);
		}

		const VolumeDropDown = () => (
			<Dropdown
				fluid
				selection
				multiple={multiple}
				search={search}
				value={value}
				options={options}
				placeholder="Volume Config"
				onChange={this.handleChange}
				onSearchChange={this.handleSearchChange}
				style={{
					"backgroundColor" : background,
					"color": "white"
				}}
			/>
		);

		const onAddVolumeConfiguration = e => {
			this.setState({
				config: config.concat(value),
				value: []
			});
		};

		return (
			<div>
				<h2>Volume</h2>
				<Grid columns={1} divided centered>
					<Grid.Row centered>
						<Grid.Column>
							<Form unstackable>
								<Form.Group centered>
									<VolumeDropDown />
									<Button
										onClick={onAddVolumeConfiguration}
										icon="plus"
									/>
								</Form.Group>
								<Form.Group unstackable grouped>
									{config.map(config => (
										<VolumeConfigComponent name={config} />
									))}
								</Form.Group>
							</Form>
							{/*<pre>
								{value.length > 0 &&
									JSON.stringify(value, null, 2)}
							</pre>
							<pre>
								{config.length > 0 &&
									JSON.stringify(config, null, 2)}
							</pre>*/}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default VolumeComponent;
