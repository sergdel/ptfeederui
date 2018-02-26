import {Editor, EditorState, ContentBlock} from 'draft-js';
import React, { Component } from "react";

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.saveTxtFile = this.saveTxtFile.bind(this);
    this.setDomEditorRef = ref => this.domEditor = ref;
  }

  componentDidMount(){
    this.domEditor.focus()
  }

  saveTxtFile(evt) {
    const {saveTxtFile} = this.props;
    console.log(this.state.editorState.toJS());
    console.log(this.state.editorState.getCurrentContent().getBlockMap().getText());
    console.log(this.setDomEditorRef.value);
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
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    color: '#fff'
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};