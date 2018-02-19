import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Dropdown, Label } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export default class NumberInput extends PureComponent {
  PropTypes = {
    percentage: PropTypes.bool,
    acceptBoolean: PropTypes.bool
  };

  onKeyPress = event => {
    const { percentage } = this.props;
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const currentInputValue = event.target.value;

    const validPercentage = num => {
      return /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/.test(num);
    };

    if (!/^[0-9]{1,45}$/.test(keyValue)) {
      event.preventDefault();
    }

    if (
      percentage &&
      currentInputValue &&
      !validPercentage(currentInputValue + keyValue)
    ) {
      event.preventDefault();
    }
  };

  state = {
    name: this.props.name
  };

  render() {
    const { percentage, acceptBoolean, title, note } = this.props;

    if (acceptBoolean) {
      return (
        <Form.Field style={{ paddingTop: "20px" }}>
          <InfoLabel />
          <Dropdown
            placeholder={title}
            size="large"
            label={title}
            name={title}
            fluid
            search
            selection
            options={[
              { key: "true", value: "true", text: "true" },
              { key: "false", value: "false", text: "false" }
            ]}
            allowAdditions={true}
            onAddItem={this.handleAddition}
            onKeyPress={this.onKeyPress}
            onChange={this.handleChange}
          />
          {percentage ? "%" : ""}
        </Form.Field>
      );
    }

    return (
      <Form.Field style={{ paddingTop: "20px" }}>
        <InfoLabel title={title} />
        <Input
          type="text"
          pattern="[0-9]*"
          control="input"
          placeholder={title}
          onKeyPress={this.onKeyPress}
          name={title}
        />
        {percentage ? "%" : ""}
        {note ? (
          <Label as="a" color="teal" pointing="above">
            {note}
          </Label>
        ) : (
          ""
        )}
      </Form.Field>
    );
  }
}
