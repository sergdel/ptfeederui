import { Editor, EditorState, convertToRaw } from "draft-js";
import React, { Component } from "react";
import { post } from "axios";

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.saveTxtFile = this.saveTxtFile.bind(this);
    this.setDomEditorRef = ref => (this.domEditor = ref);
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  saveTxtFile(evt) {
    const { filePath } = this.props;
    console.log(this.state.editorState.toJS());
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(this.setDomEditorRef);
    post("/txt_save", {
      path: filePath,
      text: convertToRaw(this.state.editorState.getCurrentContent())
    }).then(function(response) {
      console.log(response);
    });
    //this.setState(state);
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref={this.setDomEditorRef}
          />
        </div>
        <input
          onClick={this.saveTxtFile}
          style={styles.button}
          type="button"
          value="Save"
        />
      </div>
    );
  }
}
const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    color: "#fff"
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  }
};
