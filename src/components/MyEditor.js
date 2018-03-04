import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import React, { Component } from "react";
import { post } from "axios";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.saveTxtFile = this.saveTxtFile.bind(this);
    this.setDomEditorRef = ref => (this.domEditor = ref);
  }

  componentDidMount() {
    //this.domEditor.focus();
  }

  saveTxtFile(evt) {
    const { filePath } = this.props;
    const { editorState } = this.state;
    console.log(this.state.editorState.toJS());
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    post("/txt_save", {
      path: filePath,
      text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }).then(function(response) {
      console.log(response);
    });
    //this.setState(state);
  }

  onChange(editorState) {
    this.setState({
      editorState,
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            initialEditorStat={this.state.editorState}
            onEditorStateChange={this.onChange}
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
