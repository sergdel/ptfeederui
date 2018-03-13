import * as React from "react";
import { Dropdown, Form } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export const DropDown: React.SFC<{
  options: object[];
  title: string;
  wiki: string;
  allowAdditions?: boolean;
  value: string;
  onChange: any;
  index: number;
}> = ({
  options,
  title,
  wiki,
  allowAdditions = false,
  value,
  onChange,
  index = -1
}) => {
  const handleAddition = (e, { value }) => {};
  return (
    <Form.Field style={{ paddingTop: "20px" }}>
      <InfoLabel title={title} wiki={wiki} />
      <Dropdown
        placeholder={value || title}
        size="large"
        id={title}
        fluid
        labeled={true}
        label={title}
        search
        selection
        name={title}
        options={options}
        value={value}
        allowAdditions={allowAdditions}
        onAddItem={handleAddition}
        onChange={onChange}
      />
    </Form.Field>
  );
};
