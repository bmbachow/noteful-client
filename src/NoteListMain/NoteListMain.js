import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import HasError from '../HasError'
import PropTypes from 'prop-types'

//renders list of notes
class NoteListMain extends React.Component {
  // defaultProps is a property in React component used to set default values for the props argument.
  // It will be changed if the prop property is passed.
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext
  render () {
    const { folderid } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderid)
    return (
      <section className='NoteListMain'>
        <HasError>
          <ul>
            {notesForFolder.map((note) =>
              <li key={note.id} id={note.id}>
                <Note
                  id={note.id}
                  title={note.title}
                  modified={note.modified}
                  history={this.props.history}
                />
              </li>
            )}
          </ul>
        </HasError>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object
}

export default NoteListMain;