import * as React from "react";
import { Label, Popup } from "semantic-ui-react";

export const InfoLabel: React.SFC<any> = ({ title, wiki }) => {
  return title ? (
    <Popup
      trigger={
        <Label
          onClick={() =>
            wiki &&
            window.open("https://github.com/mehtadone/PTFeeder/wiki", "_blank")
          }
        >
          {title || ""}
        </Label>
      }
    >
      {wiki ? (
        <a href={"https://github.com/mehtadone/PTFeeder" + wiki}>
          {"https://github.com/mehtadone/PTFeeder" + wiki}
        </a>
      ) : null}
    </Popup>
  ) : null;
};

export default InfoLabel;
