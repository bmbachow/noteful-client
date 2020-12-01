import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';
import HasError from '../HasError';
import PropTypes from 'prop-types';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  handleDelete = noteId => {
    this.props.history.push('/')
  }

  render () {
    const { notes } = this.context //=[]
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <HasError>
          <Note
            id={note.id}
            title={note.title}
            modified={note.modified}
            onDeleteNote={this.handleDelete}
            history={this.props.history}
          />
        </HasError>
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.object
}

export default NotePageMain;