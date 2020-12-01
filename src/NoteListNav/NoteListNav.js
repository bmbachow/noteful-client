import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import HasError from '../HasError'

//NoteListNav calls CircleButton component
class NoteListNav extends React.Component {
  static contextType = ApiContext;
  render () {
    const { folders=[], notes=[] } = this.context  //an object containing 2 arrays are assigned the value of this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.folderid}>
              <HasError>
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.folderid}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.folderid)}
                  </span>
                  {folder.title}
                </NavLink>
              </HasError>
            </li>
          )}
        </ul>
        <HasError>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </CircleButton>
          </div>
        </HasError>
      </div>
    )
  }
}
// NoteListNav__folder-link contains a link to the folders added to the app
// NoteListNav__num-notes displays the # of notes in each folder
export default NoteListNav;