import React, { Component } from "react";
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

class VolumeComponent extends Component {
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
							<Form>
								<Form.Group centered>
									<VolumeDropDown />
									<Button
										onClick={onAddVolumeConfiguration}
										icon="plus"
									/>
								</Form.Group>
								<Form.Group unstackable widths={2}>
									{config.map(config => (
										<VolumeConfigComponent name={config} />
									))}
								</Form.Group>
							</Form>
							<pre>{JSON.stringify(value, null, 2)}</pre>
							<pre>{JSON.stringify(config, null, 2)}</pre>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default VolumeComponent;
