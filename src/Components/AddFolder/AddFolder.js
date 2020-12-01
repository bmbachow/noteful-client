import React from 'react';
import './AddFolder.css'
import NotefulContext from '../../NotefulContext';
import config from '../../config'

class AddFolder extends React.Component {
    state = {
        message: "",
    }
    static contextType = NotefulContext;

    validateName(name) {
        if (!name || name.trim() === "") {
           this.setState({
               message: <p className="folderError">Folder must have a name.</p>
           })
           return null;
        }
        return name;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const name = this.validateName(e.target.Folder.value);
        if(!name) {
            return
        }
        const folder = { name }
        e.target.Folder.value = "";

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(folder)
        })
            .then(res => {
                if (!res.ok) {
                    this.setState({
                        message: "No response from server."
                    })
                }
                return res.json()
            })
            .then(folder => {
                this.context.setFolders(folder)
            }).catch( e => {
                this.setState({
                    message: e.message
                })
            })

    }


    render() {
        return (
            <form className="addFolder" onSubmit={this.handleSubmit}>
                <fieldset className="folderField">
                    <legend>Create a new Folder</legend>
                    <label htmlFor="folderName" name="Folder"></label>
                    <input className="folderName" name="Folder" placeholder="e.g. 'Favorites'"></input>
                    <p>{this.state.message}</p>
                    <button className="folderButton">Submit</button>
                </fieldset>

            </form>
        )
    }
}

export default AddFolder;