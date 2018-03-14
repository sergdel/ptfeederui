import * as React from "react";
import { Dropdown, Form } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";
import { observer, inject } from "mobx-react";

export const DropDown: React.SFC<{
  options: Array<object>;
  title: string;
  wiki: string;
  allowAdditions?: boolean;
  value: string;
  index: number;
}> = inject("settings", "appSettings")(
  observer(
    ({
      options,
      title,
      wiki,
      settings: { updateField },
      appSettings: { selectedMenuItem },
      allowAdditions = false,
      value,
      index = -1
    }) => {
      //TODO
      const handleAddition = (e, { value }) => {};

      const handleChange = (evt, { value }) => {
        updateField(selectedMenuItem, title, value, index);
      };

      return (
        <Form.Field style={{ paddingTop: "20px" }}>
          <InfoLabel title={title} wiki={wiki} />
          <Dropdown
            placeholder={value || title}
            size="large"
            id={title}
            fluid
            search
            selection
            name={title}
            options={options}
            value={value}
            allowAdditions={allowAdditions}
            onAddItem={handleAddition}
            onChange={handleChange}
          />
        </Form.Field>
      );
    }
  )
);
