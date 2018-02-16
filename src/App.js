import React, { Component } from "react";
import Volume from "./Volume";
import Content from "./DynamicComponent";
import logo from "./logo.png";
import config from "./config.json";
import { lightBlue, background, textColour, primary } from "./colours";
import "./App.css";
import {
	Button,
	Icon,
	Grid,
	Form,
	Menu,
	Segment,
	Container
} from "semantic-ui-react";

const menuItems = config["menu items"];

class App extends Component {
	state = {
		selectedMenuItem: "Volume",
		activeItem: "",
		menuItems: config["menu items"]
	};

	menuSelect = item => {
		this.setState({ selectedMenuItem: item.component });
		console.log("setting selectedMenuItem to ", item.component);
	};

	saveConfiguration() {}

	render() {
		const { selectedMenuItem, activeIndex, menuItems } = this.state;

		return (
			<Container
				className="App"
				style={{ height: "600px", backgroundColor: lightBlue, marginTop:"40px" }}
			>
				<Grid style={{ color: textColour }}>
					<Grid.Column width={4}>
						<Menu fluid vertical tabular>
							<Menu.Item name="logo" align="center">
								<img src={logo} width="50px" height="50px" />
							</Menu.Item>

							{menuItems.map(item => (
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

					<Grid.Column width={10}>
						<Segment
							style={{
								backgroundColor: background,
								paddingRight: "30px"
							}}
						>
							<Content tag={selectedMenuItem} />
						</Segment>
					</Grid.Column>
				</Grid>

				<Button
					onClick={this.saveConfiguration}
					style={{ backgroundColour: primary, marginBottom: "30px" }}
					disabled
				>
					Save All
				</Button>
			</Container>
		);
	}
}

export default App;
