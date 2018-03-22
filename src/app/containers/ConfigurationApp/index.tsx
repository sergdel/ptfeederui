import * as React from "react";
import { inject, observer } from "mobx-react";
import { ComponentFactory, Preloader, DropDown } from "app/components";
import { APP_SETTINGS, SETTINGS, UI_DEFS } from "app/constants/stores";
import { CLIENTONLY } from "app/constants";

import logo from "../../../assets/logo.png";
import deepEqual from "deep-equal";
import _ from "lodash";
import {
  Grid,
  Segment,
  Label,
  Checkbox,
  Sticky,
  Menu,
  Input,
  Divider,
  Header,
  Form,
  Button,
  Responsive
} from "semantic-ui-react";

// const styles = {
//   background: '#263342',
//   foreground: '#2F4259',
//   lightBlue: '#2F4259',
//   textColour: '#ffffff',
//   primary: '#2F3959'
// };

export const ConfigurationApp: React.SFC<any> = inject(
  SETTINGS,
  UI_DEFS,
  APP_SETTINGS
)(
  observer(
    ({
      settings: { menuItems },
      componentDefinitions,
      appSettings: { selectMenuItem, advancedMode, isLoaded }
    }) => {
      return isLoaded || process.env.NODE_ENV === "client" ? (
        <GridBody />
      ) : (
        <Responsive as={Grid} style={{ height: "100vh" }} centered>
          <Grid.Row columns={1} verticalAlign="middle">
            <Grid.Column style={{ textAlign: "center" }}>
              <Preloader />
            </Grid.Column>
          </Grid.Row>
        </Responsive>
      );
    }
  )
);

const GridBody: React.SFC<{}> = inject(APP_SETTINGS, SETTINGS, UI_DEFS)(
  observer(
    ({
      appSettings: {
        menuItems,
        advancedMode,
        selectedMenuItem,
        setFilter,
        filter
      },

      settings: {
        getMenuData,
        save,
        importfunc,
        addConfigGroup,
        removeConfigGroup
      },
      componentDefinitions: { menuItemsMeta }
    }) => {
      const menuData = getMenuData(selectedMenuItem);
      const menuMeta = menuItemsMeta(selectedMenuItem);
      const { description = "" } = menuMeta;
      return (
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <TopMenu />
              <StatusIndicators
                BaseCoinPrice={0}
                CurrentMarketCondition={0}
                TopCoinChange={0}
              />
              <AdvancedModeToggle
                checked={advancedMode}
                onChecked={checked => {}}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" stretched centered padded="true">
            <Grid.Column>
              <Segment basic>
                <LeftNav />
              </Segment>
            </Grid.Column>
            {/* Main Content */}
            <Grid.Column>
              <Input
                icon="search"
                type="text"
                placeholder="Search..."
                onChange={(e, target: { value }) => {
                  setFilter(target.value);
                }}
                transparent
                fluid
                small="true"
                inverted
                padded="false"
              />

              <Divider />
              <Form inverted id="form" action="">
                <Header
                  style={{
                    color: "white"
                  }}
                >
                  {selectedMenuItem}
                </Header>

                {selectedMenuItem !== "General" && (
                  <Label
                    fluid
                    tiny="true"
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                      e.preventDefault();
                      addConfigGroup(selectedMenuItem);
                    }}
                  >
                    + add config
                  </Label>
                )}

                {menuData["Configs"] ? (
                  menuData["Configs"].map(
                    (configObject: object, index: number) => (
                      <ConfigGroup
                        configObject={configObject}
                        configGroupIndex={index}
                        key={index}
                      />
                    )
                  )
                ) : (
                  <ConfigGroup configObject={menuData} configGroupIndex={-1} />
                )}
              </Form>
            </Grid.Column>

            {/* RIGHT Side  */}
            <Responsive as={Grid.Column} {...Responsive.onlyComputer}>
              <Grid.Row>
                <ImportExport
                  save={() => save()}
                  importfunc={newconfig => importfunc(newconfig)}
                  // export={this.export}
                  // import={this.import}
                />
                <Segment basic style={{ color: "#fff" }}>
                  <strong>{description ? description : ""}</strong>
                </Segment>
              </Grid.Row>
            </Responsive>
          </Grid.Row>
        </Grid>
      );
    }
  )
);

const ConfigGroup: React.SFC<{
  configObject: {};
  configGroupIndex: number;
}> = inject(SETTINGS, APP_SETTINGS, UI_DEFS)(
  observer(
    ({
      settings: { removeConfigGroup },
      configObject,
      appSettings: { selectedMenuItem, filter, offsets },
      configGroupIndex,
      componentDefinitions: { menuItemsMeta }
    }) => {
      const { fixedItems } = menuItemsMeta(selectedMenuItem);
      const keys = ["key", "text", "value"];
      const p = c => _.zipObject(keys, _.times(3, () => c));
      const grouping = selectedMenuItem !== "General";
      const offsetOptions = offsets
        .filter(o => {
          return !configObject[o];
        })
        .map(p);
      return (
        <Segment
          style={{
            marginTop: "30px",
            backgroundColor: "#2F4259",
            padding: "30px",
            borderRadius: "30px",
            border: "none",
            boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.55)"
          }}
        >
          <Form.Field>
            {fixedItems &&
              fixedItems.length > -1 &&
              selectedMenuItem !== "General" &&
              fixedItems.map(name => {
                const value = configObject[name];
                return (
                  new RegExp(filter, "i").test(name) && (
                    <div style={{ border: "1px solid red" }}>
                      <ComponentFactory
                        key={value}
                        item={name}
                        value={value}
                        index={value}
                      />
                    </div>
                  )
                );
              })}

            {grouping && (
              <DropDown options={offsetOptions} title="Offsets Dropdown" />
            )}

            {Object.keys(configObject).map(value => {
              return (
                new RegExp(filter, "i").test(value) &&
                !_.includes(fixedItems, value) && (
                  <div>
                    <ComponentFactory
                      key={value}
                      item={value}
                      value={configObject[value]}
                      index={configGroupIndex}
                    />
                  </div>
                )
              );
            })}
            {grouping && (
              <Label
                attached="top right"
                style={{ cursor: "pointer" }}
                as="a"
                tag
                color="grey"
                // circular={true}
                onClick={e => {
                  e.preventDefault();
                  removeConfigGroup(selectedMenuItem, configGroupIndex);
                }}
              >
                remove config
              </Label>
            )}
          </Form.Field>
        </Segment>
      );
    }
  )
);

const TopMenu: React.SFC<{}> = () => {
  return (
    <Header
      style={{
        border: "noneindex",
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
              href={"https://github.com/mehtadone/PTFeeder"}
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

const StatusIndicators: React.SFC<any> = inject(APP_SETTINGS, SETTINGS)(
  observer(
    ({
      BaseCoinPrice,
      CurrentMarketCondition,
      TopCoinChange,
      settings: { snapshot },
      appSettings: { connected, getSettingsFromLS }
    }) => {
      return (
        <Segment basic floated="right">
          {connected ? (
            <Label circular color={"green"}>
              Connected
            </Label>
          ) : (
            <Label circular color={"red"}>
              Offline
            </Label>
          )}
          {CLIENTONLY && (
            <Label circular color={"blue"}>
              Debug
            </Label>
          )}
          <Label>
            BaseCoinPrice <Label.Detail>{BaseCoinPrice || 0}</Label.Detail>
          </Label>
          <Label>
            CurrentMarketConditions
            <Label.Detail>{CurrentMarketCondition || 0}</Label.Detail>
          </Label>
          <Label>
            TopCoinChangee <Label.Detail>{TopCoinChange || 0}</Label.Detail>
          </Label>
        </Segment>
      );
    }
  )
);

class ImportButton extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
    this.importFileFunc = this.importFileFunc.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.importBut = null;
  }
  importBut;

  importFileFunc() {
    this.importBut.click();
  }

  updateConfig = evt => {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          this.props.importfunc(e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  };

  render() {
    return (
      <div>
        <div className="hidden" style={{ display: "none" }}>
          <input
            type="file"
            onChange={this.updateConfig}
            ref={input => {
              this.importBut = input;
            }}
          />
        </div>
        <Button basic onClick={this.importFileFunc}>
          Import Settings
        </Button>
        <br />
      </div>
    );
  }
}

const ImportExport: React.SFC<any> = inject(SETTINGS, APP_SETTINGS)(
  observer(
    ({
      save,
      fileImport,
      settings: { snapshot },
      appSettings: { getSettingsFromLS, lastData }
    }) => {
      function difference(object, base) {
        function changes(object, base) {
          return _.transform(object, function(result, value, key) {
            if (!_.isEqual(value, base[key])) {
              result[key] =
                _.isObject(value) && _.isObject(base[key])
                  ? changes(value, base[key])
                  : value;
            }
          });
        }
        return changes(object, base);
      }

      const ls = getSettingsFromLS();
      const diff = difference(ls, lastData);
      diff;
      const isDirty = !deepEqual(getSettingsFromLS(), snapshot);
      return (
        <Segment basic>
          {/* <pre style={{ color: "white" }}>{JSON.stringify(diff, null, 2)}</pre> */}
          <Button primary onClick={save} className={isDirty ? "pulse" : ""}>
            Save Settings
          </Button>
          <br />
          {/* {<Button onClick={() => window["ap"](window["sh"].pop())}>Undo</Button>} */}
          <br />
          <ImportButton />
          <Button basic href="/download">
            Export Settings
          </Button>
        </Segment>
      );
    }
  )
);
const LeftNav: React.SFC<any> = inject(APP_SETTINGS, SETTINGS, UI_DEFS)(
  observer(
    ({
      appSettings: { selectMenuItem, selectedMenuItem, advancedMode },
      settings: { menuItems },
      componentDefinitions: { menuItemsMeta }
    }) => {
      return (
        <Grid.Column width={4} align="center">
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
              {menuItems.map((item, index) => {
                const meta = menuItemsMeta(item);
                return !!!meta.advanced || advancedMode ? (
                  <MenuItem
                    name={meta.title || item}
                    key={item}
                    active={selectedMenuItem === item}
                    onClick={selectMenuItem.bind(this, item)}
                    style={{
                      color: "white"
                    }}
                    menuIndex={index}
                  >
                    {meta.title}
                  </MenuItem>
                ) : null;
              })}
              {/* <MenuItem
                name="Overrides"
                active={selectedMenuItem === 'Overrides'}
                onClick={() => selectMenuItem('Overrides')}
              >
                Overrides
              </MenuItem> */}
            </Menu>
          </Sticky>
        </Grid.Column>
      );
    }
  )
);
const MenuItem: React.SFC<any> = ({ name, style, active, onClick }) => {
  return (
    <a
      className={active ? "active item" : "item"}
      style={style}
      onClick={onClick}
    >
      {name}
    </a>
  );
};

const AdvancedModeToggle: React.SFC<any> = inject(APP_SETTINGS)(
  observer(({ appSettings: { advancedMode, toggleAdvancedMode } }) => {
    return (
      <Segment basic align="left" floated="left">
        <Label>Advanced Mode</Label>
        <Checkbox
          onChange={(e, data) => toggleAdvancedMode(data.checked)}
          checked={advancedMode}
        />
      </Segment>
    );
  })
);
