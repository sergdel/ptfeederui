import React, { Component } from "react";
import Componentd from "./DynamicComponent";
import logo from "./logo.png";
import config from "./config.json";
import { background, textColour, primary } from "./colours";
import "./App.css";
import Ajv from "ajv";
import schema from "./json.schema.json";
import {
	Button,
	Grid,
	Form,
	Menu,
	Segment,
	Container,
	Modal,
	Header,
	Responsive
} from "semantic-ui-react";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

const valid = validate(config);
if (valid) console.log("Valid!");
else console.log("Invalid: " + ajv.errorsText(validate.errors));

class App extends Component {
	state = {
		selectedMenuItem: "General",
		availableConfig: null,
		activeItem: "",
		menuItems: config["config"],
		invalidConfig: Boolean(valid) === false
	};

	menuSelect = item => {
		this.setState({
			selectedMenuItem: item.component,
			availableConfig: item.options
		});
		console.log("setting selectedMenuItem to ", item.component);
	};

	saveConfiguration() {}

	render() {
		const { menuItems, availableConfig } = this.state;

		return (
			<Responsive
				as={Container}
				className="App"
				minWidth={400}
				height="100"
			>
				<Modal open={this.state.invalidConfig}>
					<Modal.Header>ERROR</Modal.Header>
					<Modal.Content image>
						<Modal.Description>
							<Header>Malformed Configuration</Header>
							<p>JSON does not match the supplied schema</p>
							<p>
								<pre>
									{JSON.stringify(validate.errors, null, 2)}
								</pre>
							</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>

				<Grid style={{ color: textColour }}>
					<Grid.Column width={4}>
						<Menu vertical style={{ backgroundColor: background }}>
							<Menu.Item name="logo" align="center">
								<img
									src={logo}
									width="50px"
									height="50px"
									alt="icon"
								/>
							</Menu.Item>

							{menuItems &&
								menuItems.map(item => (
									<Menu.Item
										name={item.title}
										key={item.title}
										onClick={() => this.menuSelect(item)}
										style={{ color: textColour }}
									>
										<pre>{item.title}</pre>
									</Menu.Item>
								))}
						</Menu>
					</Grid.Column>

					<Grid.Column width={12}>
						<Form.Group align="left" inline>
							{availableConfig &&
								availableConfig.map(item => (
									<Componentd tag={item.type} data={item} />
								))}
						</Form.Group>
					</Grid.Column>
				</Grid>

				<Button
					onClick={this.saveConfiguration}
					style={{ backgroundColour: primary, marginBottom: "30px" }}
					disabled
				>
					Save All
				</Button>
			</Responsive>
		);
	}
}

export default App;
