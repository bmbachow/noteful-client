import React from 'react'
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import HasError from '../HasError'
import './NotePageNav.css'
import PropTypes from 'prop-types'

class NotePageNav extends React.Component {
  //history.goBack() method to go back to the previous entry in the browser's history; as you would when clicking the back button
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render () {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    // If expr1 can be converted to true, returns expr1; else, returns expr2.
    // If a value can be converted to true, the value is so-called truthy
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderid)
    return (
      <div className='NotePageNav'>
        <HasError>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
        </HasError>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}
NotePageNav.propTypes = {
  match: PropTypes.object
}
export default NotePageNav;