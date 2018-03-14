import * as React from "react";
import { Form, Input, Dropdown, Label } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";
import { observer, inject } from "mobx-react";

export const NumberInput: React.SFC<{
  acceptBoolean?: boolean;
  title: string;
  percentage?: number;
  note?: string;
  value: string;
  wiki?: string;
  index?: number;
}> = inject("settings", "appSettings")(
  observer(
    ({
      percentage = false,
      note = "",
      wiki = "",
      acceptBoolean = false,
      title,
      value,
      settings: { updateField },
      appSettings: { selectedMenuItem },
      index
    }) => {
      const handleChange = (evt, { value }) => {
        // this.value = value; TODO
        updateField(selectedMenuItem, title, value, index);
      };

      const onKeyPress = event => {
        // const keyCode = event.keyCode || event.which;
        // const keyValue = String.fromCharCode(keyCode);
        // const currentInputValue = event.target.value;
        // const validPercentage = (num) => {
        //   return /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/.test(num);
        // };
      };

      const handleAddition = () => {};

      if (acceptBoolean) {
        return (
          <Form.Field style={{ paddingTop: "20px" }}>
            <InfoLabel wiki={wiki} />
            <Dropdown
              placeholder={title}
              size="large"
              name={title}
              fluid
              value={value}
              search
              selection
              options={[
                { key: "true", value: "true", text: "true" },
                { key: "false", value: "false", text: "false" }
              ]}
              allowAdditions={true}
              onAddItem={handleAddition}
              onKeyPress={onKeyPress}
              onChange={handleChange}
            />
            {percentage ? "%" : ""}
          </Form.Field>
        );
      }

      return (
        <div style={{ marginTop: "15px" }}>
          <InfoLabel title={title} wiki={wiki} />
          <Input
            type="text"
            fluid
            pattern="[0-9]*"
            control="input"
            placeholder={title}
            onKeyPress={onKeyPress}
            name={title}
            onChange={handleChange}
            value={value}
          />

          {percentage ? "%" : ""}

          {note ? (
            <Label as="a" color="teal" pointing="above">
              {note}
            </Label>
          ) : (
            ""
          )}
        </div>
      );
    }
  )
);
