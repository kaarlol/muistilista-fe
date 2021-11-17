import React, { Component } from 'react'
import Note from './Note'

class List extends Component {
    constructor(props) {
        super(props)
        this.editNote = this.editNote.bind(this)
        this.saveNote = this.saveNote.bind(this)
        this.changeContent = this.changeContent.bind(this)
        this.removeNote = this.removeNote.bind(this)
    }

    editNote(index) {
        this.props.editNote(index)
    }

    saveNote(index) {
        this.props.saveNote(index)
    }

    changeContent(content, index) {
        this.props.changeContent(content, index)
    }

    removeNote(index) {
        this.props.removeNote(index)
    }


    render() {
        return (
            <div className="List">
                {this.props.notes.map((note, index) =>
                    <Note key={index} index={index} content={note.content} changeContent={this.changeContent} removeNote={this.removeNote} beingEdited={note.beingEdited} editNote={this.editNote} saveNote={this.saveNote} />
                )}
            </div>
        );
    }
}

export default List;