import React, { Component } from "react";
import Componentd, { ComponentGroup } from "./DynamicComponent";
import logo from "./logo.png";
import options from "./config.json";
import { background, textColour, primary } from "./colours";
import "./App.css";
import Ajv from "ajv";
import schema from "./json.schema.json";
import { observable, autorun } from "mobx";
import DevTools from "mobx-react-devtools";
import { observer } from "mobx-react";
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

const valid = validate(options);
if (valid) console.log("Valid!");
else console.log("Invalid: " + ajv.errorsText(validate.errors));

class App extends Component {
	state = {
		selectedMenuItem: "General",
		availableConfig: null,
		activeItem: "",
		menuItems: options["config"],
		invalidConfig: Boolean(valid) === false,
		userData: {},
		config: options.config
	};

	bag = observable({ active: true });

	menuSelect = item => {
		this.setState({
			selectedMenuItem: item.component
		});
		console.log("setting selectedMenuItem to ", item.component);
	};

	saveConfiguration() {}

	render() {
		autorun(() => console.log(this.bag));

		this.bag.active = false;

		const { menuItems, config } = this.state;

		return (
			<Responsive
				as={Container}
				className="App"
				minWidth={400}
				height="100"
				style={{ fontFamily: "Poppins, sans-serif" }}
			>
				<DevTools />

				<Modal open={this.state.invalidConfig}>
					<Modal.Header>ERROR</Modal.Header>
					<Modal.Content image>
						<Modal.Description>
							<Header>Malformed Configuration</Header>
							<p>JSON does not match the supplied schema</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>

				<Grid style={{ fontFamily: "Poppins" }}>
					<Grid.Column width={4}>
						<Menu
							vertical
							style={{
								backgroundColor: background,
								fontFamily: "Poppins",
								fontSize: "16px",
								boxShadow: "none",
								border: "none"
							}}
						>
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
							<pre style={{ color: "white" }}>
								<pre>
									{config.map(group => (
										<ComponentGroup group={group.options} />
									))}
								</pre>
							</pre>
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

export default observer(App);
