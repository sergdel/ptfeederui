import React, { Component } from "react";
import { ComponentFactory } from "./components/ComponentFactory";
import MenuItem from "./components/MenuItem";
import MyEditor from "./components/MyEditor";
import logo from "./assets/images/logo.png";
import { config as options } from "./config/config.json";
import { background, textColour } from "./config/constants";
import "./App.css";
import Ajv from "ajv";
import schema from "./config/json.schema.json";
import _ from "lodash";
// import DevTools from "mobx-react-devtools";
import { Form, Input, Label } from "semantic-ui-react";
import { post } from "axios";

import f from "fuzzysearch";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Menu,
  Modal,
  Popup,
  Responsive,
  Segment,
  Sticky
} from "semantic-ui-react";
const ajv = new Ajv({ allErrors: true, schemaId: "auto" });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.registerField = this.registerField.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.openFileEditor = this.openFileEditor.bind(this);
    this.fields = [];
    this.savedConfig = {};
    this.state = {
      selectedMenuItem: {
        title: options[0].title,
        wiki: options[0].wiki,
        hasfiles: options[0].hasfiles,
        description: options[0].description
      },
      advancedMode: null,
      availableConfig: null,
      menuItems: options.map(item => {
        return {
          title: item.title,
          wiki: item.wiki,
          hasfiles: item.hasfiles,
          advanced: item.advanced,
          description: item.description
        };
      }),
      userData: {},
      savedConfig: {},
      config: options.config,
      configHasErrors: {},
      configErrorMessage: {},
      filter: "",
      optionlist: options,
      overrides: [{}]
    };
  }

  componentWillMount() {
    const validate = ajv.compile(schema);
    const valid = validate(options || {});

    if (valid) console.log("Valid!");
    else console.log("Invalid: " + ajv.errorsText(validate.errors));

    this.setState({
      configHasErrors: Boolean(valid) === false,
      configErrorMessage: ajv.errorsText(validate.errors)
    });
  }

  onMenuSelect = item => {
    let state = this.state;
    state.selectedMenuItem = item;
    state.filePath = null;
    this.setState(state);
  };

  openFileEditor = filepath => {
    let state = this.state;
    console.log(filepath);
    state.filePath = filepath;
    this.setState(state);
  };

  onFilterList = (event, { value }) => this.setState({ filter: value });

  updateConfig = evt => {
    const url = "/upload";
    const formData = new FormData();
    let file = evt.target.files[0];
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    post(url, formData, config).then(
      function(response) {
        if (response.data.success === true) {
          let newconfig = response.data.configobj.config;
          const validate = ajv.compile(schema);
          const valid = validate(newconfig || {});

          if (valid) {
            let state = this.state;
            state.selectedMenuItem = {
              title: newconfig[0].title,
              wiki: newconfig[0].wiki,
              hasfiles: newconfig[0].hasfiles
            };
            state.menuItems = newconfig.map(item => {
              return {
                title: item.title,
                wiki: item.wiki,
                hasfiles: item.hasfiles
              };
            });
            state.config = newconfig.config;
            state.optionlist = newconfig;
            this.setState(state);
            this.forceUpdate();
          }
        }
      }.bind(this)
    );
  };

  save = () => {
    let res = [];
    let state = { ...this.state };
    _.each(Object.keys(this.fields), (item, index) => {
      if (this.fields[item]) {
        res[item] = this.fields[item].value;
      }
    });
    post("/save", { config: res }).then(function(response) {
      console.log(response);
    });
    this.setState(state);
  };

  import = () => {
    this.importButton.click();
  };

  registerField = (title, ref) => {
    this.fields[title] = ref;
  };

  setHasFiles = idx => {
    let state = this.state;
    state.optionlist[idx].hasfiles = true;
    state.menuItems = state.optionlist.map(item => {
      return { title: item.title, wiki: item.wiki, hasfiles: item.hasfiles };
    });
    this.setState(state);
  };

  render() {
    const {
      menuItems,
      selectedMenuItem,
      configHasErrors,
      configErrorMessage,
      filter,
      optionlist,
      filePath,
      advancedMode,
      overrides
    } = this.state;

    if (configHasErrors) {
      return <ErrorModal errorMessage={configErrorMessage} />;
    }

    return (
      <Grid
        style={{
          fontFamily: "Poppins",
          width: "height: 90vh",
          overflow: "none"
        }}
        middle="true"
        aligned="true"
        center="true"
      >
        {/* <DevTools /> */}

        {/* HEADER */}
        <Grid.Row columns={1}>
          <Grid.Column>
            <TopMenu activeItem={selectedMenuItem} />
            <StatusIndicators />
            <Segment basic align="left">
              <Label>Advanced Mode</Label>
              <Checkbox
                onChange={(event, { checked }) => {
                  this.setState({ advancedMode: checked });
                }}
                checked={this.state.checked}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          columns="equal"
          stretched="stretched"
          centered="centered"
          padded="true"
          style={{
            backgroundColor: background
          }}
        >
          <Grid.Column>
            <Segment basic="basic">
              <LeftNav
                selectedMenuItem={selectedMenuItem}
                menuItems={menuItems}
                onMenuSelect={this.onMenuSelect}
                openFileEditor={this.openFileEditor}
                setHasFiles={this.setHasFiles}
                advancedMode={advancedMode}
              />
            </Segment>
          </Grid.Column>

          {/* Main Content */}
          <Grid.Column>
            <MainContent
              optionlist={optionlist}
              menuItems={menuItems}
              selectedMenuItem={selectedMenuItem}
              onFilterList={this.onFilterList}
              filter={filter}
              filePath={filePath}
              registerField={this.registerField}
              advancedMode={advancedMode}
            />

            {selectedMenuItem === "overrides" ? (
              <div>
                <Button
                  onClick={e =>
                    this.setState({
                      overrides: overrides.concat({ bleh: "bleh" })
                    })
                  }
                >
                  +
                </Button>
                {overrides.map((o, i) => (
                  <OverrideKeyPair
                    id={i}
                    ref={input => {
                      this.registerField(i, input);
                    }}
                  />
                ))}
              </div>
            ) : null}
          </Grid.Column>

          {/* RIGHT Side  */}
          <Responsive as={Grid.Column} {...Responsive.onlyComputer}>
            <Grid.Row>
              <ImportExport
                save={this.save}
                export={this.export}
                import={this.import}
              />
              <Segment basic style={{ color: "#fff" }}>
                <strong>{selectedMenuItem.description}</strong>
              </Segment>
            </Grid.Row>
          </Responsive>
        </Grid.Row>
        {/* FOOTER */}
        <Grid.Row columns={1}>
          <Grid.Column />
        </Grid.Row>
        <div className="hidden">
          <input
            type="file"
            onChange={this.updateConfig}
            ref={input => {
              this.importButton = input;
            }}
          />
        </div>
      </Grid>
    );
  }
}

const StatusIndicators = ({
  BaseCoinPrice,
  CurrentMarketCondition,
  TopCoinChange
}) => {
  return (
    <Segment basic align="center">
      <Label>
        BaseCoinPrice <Label.Detail>{BaseCoinPrice || 0}</Label.Detail>{" "}
      </Label>
      <Label>
        DogCurrentMarketConditions{" "}
        <Label.Detail>{CurrentMarketCondition || 0}</Label.Detail>
      </Label>
      <Label>
        TopCoinChangee <Label.Detail>{TopCoinChange || 0}</Label.Detail>{" "}
      </Label>
    </Segment>
  );
};

const OverrideKeyPair = ({ id }) => {
  return (
    <div>
      <Label>{id}</Label>
      <Input type="text" data-type="key" data-id={id} size="mini" />
      <Input type="text" data-type="value" data-id={id} size="mini" />
    </div>
  );
};

const ImportExport = props => {
  return (
    <Segment basic>
      <Button primary icon="save" onClick={props.save}>
        Save Settings
      </Button>

      <br />
      <Button basic icon="upload" onClick={props.import}>
        Import Settings
      </Button>
      <br />

      <Button basic icon="upload" href="/download">
        Export Settings
      </Button>
    </Segment>
  );
};

const TopMenu = props => {
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
        <Menu.Item name="logo">
          <img src={logo} alt="icon" />
          PTFeeder
        </Menu.Item>

        <Menu.Menu position="right" padded="true">
          <Menu.Item name="wiki">
            <a
              href={
                "https://github.com/mehtadone/PTFeeder" + props.activeItem.wiki
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </a>
          </Menu.Item>

          <Menu.Item name="videos">
            <a
              href="https://github.com/mehtadone/PTFeeder/wiki/Videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Videos
            </a>
          </Menu.Item>

          <Menu.Item name="support">
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

const LeftNav = ({
  selectedMenuItem,
  menuItems,
  onMenuSelect,
  openFileEditor,
  setHasFiles,
  advancedMode
}) => {
  return (
    <Grid.Column width={4} align="center">
      <Sticky>
        <Menu
          vertical="vertical"
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
            menuItems
              .filter(
                ((advancedMode, option) => {
                  return advancedMode ? true : !!!option.advanced;
                }).bind(this, advancedMode)
              )
              .map((item, index) => (
                <MenuItem
                  name={item.title}
                  key={item.title}
                  active={selectedMenuItem === item}
                  onClick={() => onMenuSelect(item)}
                  openFileEditor={openFileEditor}
                  style={{
                    color: textColour
                  }}
                  hasTxtFiles={item.hasfiles}
                  setHasFiles={setHasFiles}
                  menuIndex={index}
                >
                  {item.title}
                </MenuItem>
              ))}
          <MenuItem
            name="Overrides"
            active={selectedMenuItem === "overrides"}
            onClick={() => onMenuSelect("overrides")}
          >
            Overrides
          </MenuItem>
        </Menu>
      </Sticky>
    </Grid.Column>
  );
};

const MainContent = ({
  optionlist,
  menuItems,
  selectedMenuItem,
  onFilterList,
  filter,
  registerField,
  filePath,
  advancedMode
}) => {
  return (
    <div>
      {filePath ? (
        <Grid.Column width={5}>
          <MyEditor filePath={filePath} />
        </Grid.Column>
      ) : (
        <Grid.Column width={5}>
          <Input
            icon="search"
            type="text"
            placeholder="Search..."
            onChange={onFilterList}
            transparent="transparent"
            fluid="fluid"
            small="true"
            inverted="inverted"
            padded="false"
          />

          <Divider />
          <Form inverted="inverted" id="form" action="">
            <Header
              style={{
                color: "white"
              }}
            >
              {selectedMenuItem.title}
            </Header>
            {menuItems.map(item => (
              <ComponentList
                category={item.title}
                selectedMenuItem={selectedMenuItem}
                filter={filter}
                registerField={registerField}
                optionlist={optionlist}
                advancedMode={advancedMode}
              />
            ))}
          </Form>
        </Grid.Column>
      )}
    </div>
  );
};

const ComponentList = ({
  category,
  selectedMenuItem,
  filter,
  registerField,
  optionlist,
  advancedMode
}) => {
  let currentOptions = _.find(optionlist, { title: category });

  return (
    category === selectedMenuItem.title &&
    currentOptions.options.map(
      data =>
        f(filter.toLowerCase(), data.title.toLowerCase()) && (
          <ComponentFactory
            data={data}
            category="category"
            registerField={registerField}
            advancedMode={advancedMode}
          />
        )
    )
  );
};

const ErrorModal = ({ errorMessage }) => {
  return (
    <Modal open={true}>
      <Modal.Header>ERROR</Modal.Header>
      <Modal.Content image="image">
        <Modal.Description>
          <Header>Malformed Configuration</Header>
          <p>JSON does not match the supplied schema</p>
          <p>{errorMessage}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
