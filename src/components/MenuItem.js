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
    this.addFiles = this.addFiles.bind(this);
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

  addFiles() {
    const {setHasFiles, menuIndex} = this.props;
    console.log (menuIndex);
    setHasFiles(menuIndex);
  }

  state = {
    name: this.props.name
  };

  render() {
    const { name, style, active, onClick} = this.props;

    let hasTxtFiles = false;
    return (
      <a
        className={active ? "active item" : "item"}
        style={style}
        onClick={onClick}
      >
        {hasTxtFiles ? (
          <span className="leftmenu-icons">
            <i class="caret down icon" />
            <i class="folder open icon" />
          </span>
        ) : null}
        {name}

        <i class="plus square outline icon" onClick={this.addFiles}></i>
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
