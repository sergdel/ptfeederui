import React, { PureComponent } from "react";
import PropTypes from "prop-types";

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
    const { name, openFileEditor } = this.props;
    evt.preventDefault();
    console.log(evt.target.id);
    //console.log( filename);
    openFileEditor(name + "/" + evt.target.id);
    evt.stopPropagation();
  }

  state = {
    name: this.props.name
  };

  render() {
    const { name, style, active, onClick, hasTxtFiles } = this.props;

    return (
      <a
        className={active ? "active item" : "item"}
        style={style}
        onClick={onClick}
      >
        {hasTxtFiles ? (
          <span>
            <i class="caret down icon" />
            <i class="folder open icon" />
          </span>
        ) : null}
        {name}
        {hasTxtFiles && active ? (
          <div>
            <div
              href="#"
              className="fileMenu"
              id="dca.txt"
              onClick={this.selectFile}
            >
              <i class="file alternate outline icon" />
              dca.txt
            </div>
            <div
              href="#"
              className="fileMenu"
              id="indicator.txt"
              onClick={this.selectFile}
            >
              <i class="file alternate outline icon" />
              indicator.txt
            </div>
            <div
              href="#"
              className="fileMenu"
              id="pairs.txt"
              onClick={this.selectFile}
            >
              <i class="file alternate outline icon" />
              pairs.txt
            </div>
          </div>
        ) : null}
      </a>
    );
  }
}
