import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Dropdown, Label } from "semantic-ui-react";
import InfoLabel from "./InfoLabel";

export default class MenuItem extends PureComponent {
  PropTypes = {
    percentage: PropTypes.bool,
    acceptBoolean: PropTypes.bool
  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.selectFile = this.selectFile.bind(this);
  }

  handleChange(evt, { value }) {
    this.value = value;
  }

  selectFile(evt) {
    evt.preventDefault();
    console.log (evt.target);
    //console.log( filename);
  }

  state = {
    name: this.props.name
  };

  render() {
    const { name, style, active, onClick, hasTxtFiles} = this.props;

    return (
      <a className={active? "active item": "item"} style={style} onClick={onClick}>
        {hasTxtFiles ?
          <span>
            <i class="caret down icon"></i>
            <i class="folder open icon"></i>
          </span>
          : null}
        {name}
        {
          hasTxtFiles && active ?
            <div>
              <div href="#" className="fileMenu" id="dca.txt" onClick={this.selectFile}>
                <i class="file alternate outline icon"></i>
                dca.txt
              </div>
              <div href="#" className="fileMenu" id="indicator.txt" onClick={this.selectFile}>
                <i class="file alternate outline icon"></i>
                indicator.txt
              </div>
              <div href="#" className="fileMenu" id="pairs.txt" onClick={this.selectFile}>
                <i class="file alternate outline icon"></i>
                pairs.txt
              </div>
            </div>
            : null
        }
      </a>
    );
  }
}
