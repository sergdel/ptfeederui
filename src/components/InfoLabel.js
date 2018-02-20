import React, { Component } from "react";
import { Label, Popup } from "semantic-ui-react";

class InfoLabel extends Component {
  render() {
    const { title, wiki } = this.props;
    console.log (this.props);
    return (
      <Popup
        trigger={
          <Label
            style={{ height: "28px" }}
            onClick={() =>
              window.open(
                "https://github.com/mehtadone/PTFeeder/wiki",
                "_blank"
              )
            }
            icon="add"
          >
            {title || ""}
          </Label>
        }
        content={wiki ? wiki : "more info"}
      />
    );
  }
}

export default InfoLabel;
