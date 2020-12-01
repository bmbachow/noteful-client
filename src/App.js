import React from 'react';
import './App.css'
import { Route, Link } from 'react-router-dom'

import MainNote from './Components/MainNote/MainNote'
import ListNote from './Components/ListNote/ListNote'
import Folder from './Components/Folder/Folder'
import GoBack from './Components/GoBack/GoBack'
import AddNote from './Components/AddNote/AddNote'
import AddFolder from './Components/AddFolder/AddFolder'

import NotefulContext from './NotefulContext'
import FormError from './FormError'
import config from './config'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  setFolders = (folder) => {
    this.setState({
      folders: this.state.folders.concat(folder)
    })
  }

  setNotes = (note) => {
    this.setState({
      notes: this.state.notes.concat(note)
    })
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== parseInt(id))
    })
  }

  deleteFolder = (id) => {
    
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== parseInt(id)),
      notes: this.state.notes.filter(note => note.folder_id !== parseInt(id))
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then(res => res.json())
      .then(notes => {
        this.setState({
          notes
        })
      })

    fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders
        })
      })
  }

  render() {
    return (
      <NotefulContext.Provider value={
        {
          notes: this.state.notes,
          folders: this.state.folders,
          setNotes: this.setNotes,
          deleteNote: this.deleteNote,
          setFolders: this.setFolders,
          deleteFolder: this.deleteFolder,
        }
      }>
        <div className="grid-container">
          <header>
            <Link className="link" to='/'><h1>Noteful</h1></Link>
          </header>
          <nav>
            <Route exact path='/' component={Folder} />
            <Route path='/folder/:folder_id' component={Folder} />
            <Route path='/note/:noteId' component={GoBack} />
            <FormError>
              <Route exact path='/' component={AddFolder} />
            </FormError>
          </nav>
          <main>
            <Route exact path='/' component={MainNote} />
            <Route path="/folder/:folder_id" component={MainNote} />
            <FormError>
              <Route className="addNote" path='/addnote' component={AddNote} />
            </FormError>
            <Route path="/note/:noteId" component={ListNote} />
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
