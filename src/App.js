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
	Divider,
	Responsive,
	Sticky,
	Search,
	Label
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
				style={{ fontFamily: "Poppins, sans-serif" }}
				width="500"
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

				<Segment
					as={Header}
					attached="top"
					float="left"
					textAlign="left"
					dividing
					style={{
						backgroundColor: "#2F4259",
						border: "none",
						color: "white"
					}}
				>
					<img src={logo} width="50px" height="50px" alt="icon" />
					PTFeeder
				</Segment>

				<Grid
					style={{ fontFamily: "Poppins" }}
					centered
					divided="vertically"
				>
					<Grid.Row>
						<Grid.Column width={5} align="center">
							<Sticky>
								<Menu
									vertical
									style={{
										fontFamily: "Poppins",
										fontSize: "16px",
										boxShadow: "none",
										border: "none",
										width: "auto",
										textAlign: "center"
									}}
								>
									{menuItems &&
										menuItems.map(item => (
											<Menu.Item
												name={item.title}
												key={item.title}
												onClick={() =>
													this.menuSelect(item)
												}
												style={{ color: textColour }}
											>
												{item.title}
											</Menu.Item>
										))}
								</Menu>
							</Sticky>
						</Grid.Column>
						<Grid.Column width={7}>
							<Form inverted>
								{config.map(group => (
									<ComponentGroup group={group.options} />
								))}
							</Form>
						</Grid.Column>
						<Grid.Column width={4}>
							<Segment>
								<Search padded size="small" />
								<Label as="a" color="teal" ribbon>
									filter list
								</Label>
							</Segment>
							<Sticky>
								<Segment padded>
									<Button primary fluid>
										Save all changes
									</Button>
									<Divider horizontal>Or</Divider>
									<Button secondary fluid>
										Reload last saved
									</Button>
								</Segment>
							</Sticky>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Responsive>
		);
	}
}

export default observer(App);
