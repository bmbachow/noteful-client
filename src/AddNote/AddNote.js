import React from 'react'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError'
import config from '../config'
import './AddNote.css'
// creates a form
//form lets user input new note name and captures
//submits new note name to the POST /notes endpoint on the server
//inclde error boundaries
//include proptypes
//Add a button to the navigation to invoke the new form?? circle button? create new folder?
class AddNote extends React.Component {
  state = {
    noteName: {
      value: ''
    }
  }
  static defaultProps = {
    match: {
      params: {}
    }

  }
  static contextType = ApiContext
  constructor(props) {
    super(props)
    this.noteName = React.createRef();
  }

  // handler to update state properties
  updateNoteName(noteName) {
    this.setState({noteName: {value: noteName, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { noteName } = this.state;
    const note = {
      title: noteName.value,
      content: event.target.content.value,
      folderid: event.target.folderid.value
      // modified: new Date()
    }

    fetch(`${config.API_ENDPOINT}notes`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${config.API_TOKEN}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(event => Promise.reject(event))
        return res.json()
      })
      .then((note) => {
        this.context.addNote(note)
        this.props.history.goBack()
      // allow parent to perform extra behaviour
      })
      .catch(error => {
        console.error({ error })
      })
    }

  // displaying a validation message requires a conditional statement
  validateNoteName() {
    const noteName = this.state.noteName.value.trim();
    if (!this.state.noteName.touched) {
      return
    }
    if (noteName.length === 0) {
      this.noteName.current.focus();
      return "Note name is required";
    } else if (noteName.length < 3) {
      this.noteName.current.focus();
      return "Note name must be at least 3 characters long";
    }
  }
  render () {
    const noteNameError = this.validateNoteName();
    return (
      <form className="AddNote" onSubmit={event => this.handleSubmit(event)}>
        <h3>Add a new note</h3>
        <div className="note-name-hint">* required field</div>
        <div className="form-group">
          <label htmlFor="noteName">Name * </label>
          <input
            type="text"
            name="noteName"
            id="noteName"
            required
            aria-label="note name"
            aria-required="true"
            aria-invalid={ this.state.noteName.touched && !!noteNameError }
            aria-describedby="noteNameError"
            placeholder="Antelope"
            ref={this.noteName}
            onChange={event => this.updateNoteName(event.target.value)}/>
            {this.state.noteName.touched && (
              <ValidationError message={noteNameError} id="noteNameError"/>
            )}
          <label className="noteContent" htmlFor="noteContent">Content * </label>
          <textarea
            name="content"
            aria-label="note content"
            placeholder="Antelopes are mammals."
            className="noteContent"
            htmlFor="noteContent"
            required
          >
          </textarea>
          <label className="noteFolder" htmlFor="noteFolder">Select a folder for your note * </label>
          <select
            name="folderid"
            required
            aria-label="select note folder"
          >
            {this.context.folders.map(folder =>
              <option key={folder.folderid} value={folder.folderid}>{folder.title}</option>
            )}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="AddNote-button"
            disabled={
            this.validateNoteName()
            }
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}

export default AddNote;
// htmlFor is used to set or return the value of the for attribute of a <label> element.
// The For attribute defines which form element will be labeled.