import * as React from "react";
import { Label, Popup } from "semantic-ui-react";

export const InfoLabel: React.SFC<any> = ({ title, wiki }) => {
  return (
    <Popup
      trigger={
        <Label
          style={{ height: "28px" }}
          onClick={() =>
            window.open("https://github.com/mehtadone/PTFeeder/wiki", "_blank")
          }
          icon="add"
        >
          {title || ""}
        </Label>
      }
      flowing
      hoverable
    >
      {wiki ? (
        <a href={"https://github.com/mehtadone/PTFeeder" + wiki}>
          {"https://github.com/mehtadone/PTFeeder" + wiki}
        </a>
      ) : (
        "more info"
      )}
    </Popup>
  );
};

export default InfoLabel;
