import React from 'react';
import './AddNote.css'
import propTypes from 'prop-types'
import NotefulContext from '../../NotefulContext'
import config from '../../config'

class AddNote extends React.Component {
    state = {
        message: ""
    }
    static contextType = NotefulContext

    validateName(name) {
        if (!name || name.trim() === "") {
            this.setState({
                message: <p className="noteError">Note must have a name.</p>
            })
            return ;
        } 
        return name;
    }

    handleSubmit = e => {
        e.preventDefault()
        const name = this.validateName(e.target.name.value);
        const folder_id = e.target.folderId.value;
        console.log(folder_id)
        const content = e.target.content.value;
        const note = { name, folder_id, content, 
            modified: new Date()
        }

        if(!name) {
            return;
        }

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(note)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong.")
                } return res.json();
            })
            .then(notes => {
                this.context.setNotes(notes)
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {context => {
                    return (
                        <form className="form" onSubmit={this.handleSubmit}>
                            <fieldset className="noteField">
                                <legend>Create a new note</legend>
                                <section className="name">
                                    <label htmlFor="name">Name: </label>
                                    <input 
                                    id="name" 
                                    name="name" 
                                    placeholder="Cats"
                                    aria-label="name field"
                                    aria-required="true"
                                    />
                                    {this.state.message}
                                </section>
                                <section className="folder">
                                    <label htmlFor="folder">Folder: </label>
                                    <select id="sort" className="sort" name="folderId">
                                        {context.folders.map((folder, idx) => (
                                            <option key={idx} value={folder.id}>{folder.name}</option>
                                        ))}
                                    </select>
                                </section>
                                <label htmlFor="textarea"/>
                                <textarea id="text" className="content" name="content" placeholder="lorem ipsum"></textarea>
                                <button htmlFor="submit">Submit</button>
                            </fieldset>
                        </form>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

AddNote.propTypes = {
    history: propTypes.any.isRequired
}

export default AddNote;