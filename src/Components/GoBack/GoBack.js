import React from 'react';
import './GoBack.css'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NotefulContext from '../../NotefulContext'

class GoBack extends React.Component {

    findFolder(context) {
        const note = context.notes.find(note => parseInt(note.id) === parseInt(this.props.match.params.noteId)) || {}
        const folder = context.folders.find(fldr => fldr.id === note.folder_id) || {}

        return folder
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {context => {
                    const folder = this.findFolder(context)
                    return (
                        <section className="goBack">
                            <Link
                                to={`/folder/${folder.id}`}
                                className="backButton">
                                {`Back to ${folder.name}`}
                            </Link>
                        </section>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

GoBack.propTypes = {
    match: propTypes.any,
    params: propTypes.any,
}

export default GoBack;