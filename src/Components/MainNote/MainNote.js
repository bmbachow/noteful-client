import React from 'react';
import moment from 'moment';
import './MainNote.css';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NotefulContext from '../../NotefulContext'
import config from '../../config'

class MainNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        notes: [],
    }

    removeNote = (note) => {
        fetch(`${config.API_ENDPOINT}/notes/${note}`,{
            method:"DELETE"
        })
        .then(() => {
            this.context.deleteNote(note)
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                { (context) => (
                    <ul>
                    <Link to='/addnote' className="addNote">Create new note</Link>
                    {context.notes.filter(note => {
                        if(this.props.match.params.folder_id) {
                            return (note.folder_id === parseInt(this.props.match.params.folder_id))
                        }else {return(true)}
                    }).map((note, idx) => (
                        <section className="Note" key={idx}>
                            <li>
                                <Link to={`/note/${note.id}`}>{`${note.name}`}</Link>
                                {' - '}
                                {`Last Modified: ${moment(note.modified).format('MMMM Do YYYY, h:mm:ss a')}`}
                            </li>
                            <button className="delbutton" onClick={() => this.removeNote(note.id)}>Delete</button>
                        </section>
                    ))}
                </ul>
                 ) }
            </NotefulContext.Consumer>
        )
    }
}

MainNote.propTypes = {
    history: propTypes.any,
    match: propTypes.any,
    params: propTypes.any,
}

export default MainNote;