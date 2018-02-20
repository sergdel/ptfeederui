import React, { Component } from "react";
import { ComponentGroup } from "./components/ComponentFactory";
import logo from "./assets/images/logo.png";
import { config as options } from "./config/config.json";
import { background, textColour, foreground } from "./config/constants";
import "./App.css";
import Ajv from "ajv";
import schema from "./config/json.schema.json";
// import DevTools from "mobx-react-devtools";
import { Form, Input, Label } from "semantic-ui-react";
import {
  Button,
  Grid,
  Menu,
  Modal,
  Header,
  Divider,
  Sticky,
  Segment
} from "semantic-ui-react";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(options);

if (valid) console.log("Valid!");
else console.log("Invalid: " + ajv.errorsText(validate.errors));

export default class App extends Component {
  state = {
    selectedMenuItem: "General",
    availableConfig: null,
    activeItem: "",
    menuItems: options.map(item => {
      return item.title;
    }),
    invalidConfig: Boolean(valid) === false,
    userData: {},
    savedConfig: {},
    config: options.config
  };

  onMenuSelect = item => {
    this.setState({
      selectedMenuItem: item.title
    });
    console.log("setting selectedMenuItem to ", item.component);
  };

  save = () => {
    const result = Array.from(document.querySelector("form").elements)
      .filter(function(item) {
        return item.name && item.value;
      })
      .map(function(item) {
        return {
          [item.name]: item.value
        };
      });

    this.setState({ savedConfig: result });
  };

  render() {
    const { menuItems, config, activeItem, selectedMenuItem } = this.state;

    return (
      <Grid
        style={{
          fontFamily: "Poppins",
          width: "height: 90vh",
          overflow: "none"
        }}
        middle
        aligned
        center
      >
        {/* <DevTools /> */}

        {/* HEADER  */}
        <Grid.Row columns={1}>
          <Grid.Column>
            <TopMenu activeItem="none" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          columns="equal"
          stretched
          centered
          padded
          style={{ backgroundColor: background }}
        >
          {/* Main Content */}

          <Grid.Column>
            <Segment>
              <LeftNav
                menuItems={menuItems}
                selectedMenuItem="General"
                onMenuSelect={this.onMenuSelect}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>1</Segment>
            <Segment>2</Segment>
            <Segment>3</Segment>
          </Grid.Column>
        </Grid.Row>
        {/* FOOTER */}
        <Grid.Row columns={1}>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    );
  }
}

const SaveButton = () => {
  return (
    <Button primary fluid onClick={this.save}>
      Save all changes
    </Button>
  );
};

const TopMenu = activeItem => {
  return (
    <Header
      style={{
        backgroundColor: background,
        border: "none",
        color: "white",
        boxShadow: "none"
      }}
    >
      <Menu>
        <Menu.Item
          name="logo"
          active={activeItem === "editorials"}
          onClick={this.handleItemClick}
        >
          <img src={logo} alt="icon" /> PTFeeder
        </Menu.Item>

        <Menu.Menu position="right" borderless padded>
          <Menu.Item
            name="wiki"
            active={activeItem === "upcomingEvents"}
            onClick={this.handleItemClick}
          >
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          </Menu.Item>

          <Menu.Item
            name="videos"
            active={activeItem === "upcomingEvents"}
            onClick={this.handleItemClick}
          >
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki/Videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Videos
            </a>
          </Menu.Item>

          <Menu.Item
            name="support"
            active={activeItem === "upcomingEvents"}
            onClick={this.handleItemClick}
          >
            <a
              href="https://github.com/mehtadone/PTFeeder/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </Menu.Item>
          <Menu.Item>
            <Label color="grey">version 0.0.1</Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Header>
  );
};

const LeftNav = ({ menuItems, selectedMenuItem, onMenuSelect }) => {
  return (
    <Grid.Column width={4} align="center">
      <Sticky>
        <Menu
          vertical
          point="right"
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
            menuItems.map(title => (
              <Menu.Item
                name={title}
                key={title}
                onClick={() => onMenuSelect(title)}
                style={{
                  color: textColour
                }}
              >
                {title}
              </Menu.Item>
            ))}
        </Menu>
      </Sticky>
    </Grid.Column>
  );
};

const NavigationMenu = (config, selectedMenuItem) => {
  return (
    <Grid.Column width={5}>
      <Input
        icon="search"
        placeholder="Search..."
        width={1}
        transparent
        fluid
        small
        inverted
        padded={false}
      />

      <Divider />

      <Form inverted id="form" action="">
        {config.map(group => (
          <Header
            style={{
              color: "white",
              display: selectedMenuItem === group.title ? "block" : "none"
            }}
          >
            {group.title}

            <ComponentGroup group={group.options} />
          </Header>
        ))}
      </Form>
    </Grid.Column>
  );
};

const ErrorModal = () => {
  return (
    <Modal open={this.state.invalidConfig}>
      <Modal.Header> ERROR </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header> Malformed Configuration </Header>
          <p> JSON does not match the supplied schema </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
