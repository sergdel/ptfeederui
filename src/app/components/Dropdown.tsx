import * as React from "react";
import { Dropdown, Form } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";
import { observer, inject } from "mobx-react";

export const DropDown: React.SFC<{
  options: Array<{ key: string; text: string; value: string }>;
  title: string;
  wiki?: string;
  allowAdditions?: boolean;
  index: number;
  onChange?: Function;
}> = inject("settings", "appSettings")(
  observer(
    ({
      options,
      title,
      wiki,
      settings: { updateField },
      appSettings: { selectedMenuItem },
      allowAdditions = false,
      onChange,
      index = -1
    }) => {
      const handleAddition = (e, { value }) => {};
      const handleChange = onChange
        ? onChange
        : (evt, { value }) => {
            updateField(selectedMenuItem, title || value, index, value);
          };

      return (
        <Form.Field style={{ paddingTop: "20px" }}>
          <InfoLabel title={title} wiki={wiki} />
          <Dropdown
            placeholder={title}
            size="large"
            id={title}
            fluid
            search
            selection
            name={title}
            options={options}
            allowAdditions={allowAdditions}
            onAddItem={handleAddition}
            onChange={handleChange}
          />
        </Form.Field>
      );
    }
  )
);
