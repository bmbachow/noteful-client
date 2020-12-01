import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css'
import NotefulContext from '../../NotefulContext';
import config from '../../config'

class Folder extends React.Component {
    static contextType = NotefulContext;

    removeFolder = (folder) => {
        fetch(`${config.API_ENDPOINT}/folders/${folder}`,{
            method:"DELETE"
        })
        .then(() => {
            this.context.deleteFolder(folder);
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {(context) => {
                    return (
                        <section className="Section">
                            {context.folders.map((folder, idx) => (
                                <li className="Folder" key={idx}>
                                    <NavLink className="navLink" to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                                    <button className="folderDel" onClick={() => this.removeFolder(folder.id)}>Delete</button>
                                </li>
                            ))}
                        </section>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

export default Folder;