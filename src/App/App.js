import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
// BrowserRouter in index js (A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.)
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
//Node-config organizes hierarchical configurations for your app deployments
import './App.css';
import AddNote from '../AddNote/AddNote'
import AddFolder from '../AddFolder/AddFolder'

// a component dedicated to each path
// React Router is a library that lets us render different components,
// depending on the URL's path.
class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    handleAddNote = note => {
      this.setState({
        notes: this.state.notes.concat(note)
      })
    };
    handleAddFolder = folder => {
      this.setState({
        folders: this.state.folders.concat(folder)
      })
    };

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
            // filter() method creates an array filled with all array elements that pass a test (provided as a function).
        })
    };
    handleDeleteFolder = folderid => {
      this.setState({
        folders: this.state.folders.filter(folder => folder.id !== folderid)
      })
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}notes`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_TOKEN}`
              }
            }),
            fetch(`${config.API_ENDPOINT}folders`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_TOKEN}`
            }
          })
            //need to submit the name of the new folder/new note
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderid'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderid'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-note" component={AddNote} />
                <Route path="/add-folder" component={AddFolder} />
            </>
        );
    }

    render() {
      const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                      <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}
export default App;