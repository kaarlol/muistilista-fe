import React, { Component } from 'react'
import List from './components/List'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      notes: []
    }

    this.saveData = this.saveData.bind(this)
    this.editNote = this.editNote.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.changeContent = this.changeContent.bind(this)
    this.removeNote = this.removeNote.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:8081/list")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            notes: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error: error
          })
        }
      )
  }

  saveData() {
    const notes = this.state.notes.slice()
    notes.forEach((note) => note.beingEdited = false)
    this.setState({
      notes: notes
    })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( this.state.notes )
    }
    fetch("http://localhost:8081/update", requestOptions)
      .then(res => res.json())
      .then(() => {
        this.setState({
          isLoaded: true
        })
      },
      (error) => {
        this.setState({
          isLoaded: false,
          error: error
        })
      }
    )
  }

  changeContent(content, index) {
    const notes = this.state.notes.slice()
    notes[index].content = content
    this.setState({
      notes: notes
    })
  }

  removeNote(index) {
    const notes = this.state.notes.slice()
    notes.splice(index, 1)
    this.setState({
      notes: notes
    })
  }

  editNote(index) {
    const notes = this.state.notes.slice()
    notes.forEach((note, i) => note.beingEdited = i === index)
    this.setState({
      notes: notes
    })
  }

  saveNote(index) {
    const notes = this.state.notes.slice()
    notes[index].beingEdited = false
    this.setState({
      notes: notes
    })
  }

  addNote() {
    const notes = this.state.notes.slice()
    notes.push({
      content: "",
      beingEdited: true
    })
    this.setState({
      notes: notes
    })
  }

  render() {
    let error = !this.state.isLoaded ? <div className="Error">Ei yhteyttä backendiin.</div> : ""
    let emptyText = this.state.notes.length < 1 ? <p className="EmptyText">Voit lisätä muistiinpanoja klikkaamalla plusnapista ja tallentaa ne levykenapista.</p> : ""
    return (
      <div className="App">
        {error}
        {emptyText}
        <List notes={this.state.notes} changeContent={this.changeContent} removeNote={this.removeNote} editNote={this.editNote} saveNote={this.saveNote} />
        <div className="Actions">
          <FontAwesomeIcon icon={faPlus} size="2x" className="ActionIcon Green" onClick={this.addNote} />
          <FontAwesomeIcon icon={faSave} size="2x" className="ActionIcon Blue" onClick={this.saveData} />
        </div>        
      </div>
    );
  }
}

export default App;
