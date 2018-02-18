import React, { Component } from "react";
import { ComponentGroup } from "./DynamicComponent";
import logo from "./logo.png";
import options from "./config.json";
import { background, textColour } from "./colours";
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
	Label,
	Input
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
		savedConfig: {},
		config: options.config,
		someting: "",
		activeItem: ""
	};

	menuSelect = item => {
		this.setState({
			selectedMenuItem: item.component
		});
		console.log("setting selectedMenuItem to ", item.component);
	};

	save = () => {
		const result = Array.from(document.querySelector("form").elements)
			.filter(function(item) {
				return item.name && item.value;
			})
			.map(function(item) {
				return { [item.name]: item.value };
			});

		this.setState({ savedConfig: result });

		// const form = document.querySelector("#form");

		// this.setState({
		// 	savedConfig: serialize(form, { hash: true })
		// });
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	render() {
		const { menuItems, config, activeItem } = this.state;

		return (
			<Responsive
				as={Container}
				className="App"
				style={{ fontFamily: "Poppins, sans-serif" }}
				width="500"
			>
				<DevTools />

				<pre style={{ color: "white" }}>
					{JSON.stringify(this.state.savedConfig)}
				</pre>

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
						backgroundColor: background,
						border: "none",
						color: "white"
					}}
				>
					<Menu>
						<Menu.Item
							name="logo"
							active={activeItem === "editorials"}
							onClick={this.handleItemClick}
						>
							<img src={logo} alt="icon" />PTFeeder
						</Menu.Item>

						<Menu.Menu position="right" borderless padded>
							<Menu.Item
								name="wiki"
								active={activeItem === "upcomingEvents"}
								onClick={this.handleItemClick}
							>
								<a href="https://github.com/mehtadone/PTFeeder/wiki">
									Wiki
								</a>
							</Menu.Item>

							<Menu.Item
								name="videos"
								active={activeItem === "upcomingEvents"}
								onClick={this.handleItemClick}
							>
								<a href="https://github.com/mehtadone/PTFeeder/wiki/Videos
">
									Videos
								</a>
							</Menu.Item>

							<Menu.Item
								name="support"
								active={activeItem === "upcomingEvents"}
								onClick={this.handleItemClick}
							>
								<a href="https://github.com/mehtadone/PTFeeder/issues">
									Support
								</a>
							</Menu.Item>
						</Menu.Menu>
					</Menu>
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
							<Form
								inverted
								id="form"
								action=""
								onSubmit={this.handleChange}
							>
								{config.map(group => (
									<ComponentGroup group={group.options} />
								))}
							</Form>
						</Grid.Column>
						<Grid.Column width={4}>
							<Segment>
								<Input
									icon="search"
									placeholder="Search..."
									size="mini"
									width={1}
									padded={false}
								/>
							</Segment>
							<Sticky>
								<Segment padded>
									<Button primary fluid onClick={this.save}>
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
