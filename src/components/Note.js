import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import './Note.css'

class Note extends Component {
  constructor(props) {
    super(props)
    this.editNote = this.editNote.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.saveOnEnter = this.saveOnEnter.bind(this)
    this.changeContent = this.changeContent.bind(this)
    this.removeNote = this.removeNote.bind(this)
  }

  editNote() {
    this.props.editNote(this.props.index)
  }

  saveNote() {
    this.props.saveNote(this.props.index)
  }

  saveOnEnter(event) {
    if (event.key === "Enter") {
      this.saveNote()
    }
  }

  changeContent(event) {
    this.props.changeContent(event.target.value, this.props.index)
  }

  removeNote() {
    this.props.removeNote(this.props.index)
  }

  render() {
    let content
    let editIcon
    if (this.props.beingEdited) {
      content = <input type="text" value={this.props.content} onChange={this.changeContent} onKeyPress={this.saveOnEnter} />
      editIcon = <FontAwesomeIcon icon={faSave} className="Icon" onClick={this.saveNote} />
    } else {
      content = <span className="Content">{this.props.content}</span>
      editIcon = <FontAwesomeIcon icon={faEdit} className="Icon" onClick={this.editNote} />
    }

    return (
      <div className="Note">
        { content }
        { editIcon }
        <FontAwesomeIcon icon={faTrashAlt} className="Icon" onClick={this.removeNote} />
      </div>
    );
    }
}

export default Note;