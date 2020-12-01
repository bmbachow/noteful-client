import React from 'react'
import './ListNote.css'
import moment from 'moment';
import propTypes from 'prop-types'
import NotefulContext from '../../NotefulContext'
import config from '../../config'

class ListNote extends React.Component {
    static contextType = NotefulContext;

    findNote(notes) {
        const foundNote = notes.find((note) => {
            if (this.props.match.params.noteId) {
                return (note.id === parseInt(this.props.match.params.noteId));
            }
            return <></>
        }) || {}
        return (
            <li>
                <h2>{foundNote.name}</h2>
                <h3>{`Last Modified: ${moment(foundNote.modified).format('MMMM Do YYYY, h:mm:ss a')}`}</h3>
                <p className="p">{foundNote.content}</p>
            </li>
        )
    }

    removeNote = () => {
        const note = this.props.match.params.noteId;

        fetch(`${config.API_ENDPOINT}/notes/${note}`,{
            method:"DELETE"
        })
        .then(() => {
            this.context.deleteNote(note);
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {(context) => {
                    return (
                        <section className="listNote">
                            <ul>
                                {this.findNote(context.notes)}
                            </ul>
                            <button className="noteDel" onClick={this.removeNote}>Delete</button>
                        </section>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }

}

ListNote.propTypes = {
    history: propTypes.any,
    match: propTypes.any,
    params: propTypes.any,
}

export default ListNote;