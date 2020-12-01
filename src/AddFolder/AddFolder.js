import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'
import './AddFolder.css'

class AddFolder extends React.Component{

  state = {
    name: {
      value: ''
    }
  }
  static defaultProps = {
    onPostFolder: () => {},
  }
  static contextType = ApiContext
  constructor(props) {
    super(props)
    this.name = React.createRef();
  }
  // handler to update state properties
  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    // form field from event
    const { name } = this.state;
    const folder = {
      title: name.value
    };

    fetch(`${config.API_ENDPOINT}folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_TOKEN}`
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(event => Promise.reject(event))
        }
        return res.json()
      })
      .then((folder) => {
        this.context.addFolder(folder)
        this.props.history.goBack()
      // allow parent to perform extra behaviour
        // this.props.onAddFolder(folder)
      })
      .catch(error => {
        console.error({ error })
      })
    }

    // displaying a validation message requires a conditional statement
    validateName() {
      const name = this.state.name.value.trim();
      if (!this.state.name.touched) {
        return
      }
      if (name.length === 0) {
        return "Folder name is required";
      } else if (name.length < 3) {
        return "Folder name must be at least 3 characters long";
      }
    }

  render () {
    const nameError = this.validateName();
    // htmlFor property sets or returns the value of the for attribute of a label
    return (
      <form className="AddFolder" onSubmit={event => this.handleSubmit(event)}>
        <h3>Add a new folder</h3>
        <div className="folder-name-hint">* required field</div>
        <div className="form-group">
          <label htmlFor="name">Name * </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Upcoming"
            required
            aria-label="folder name"
            aria-required="true"
            aria-invalid={ this.state.name.touched && !!nameError }
            aria-describedby="nameError"
            ref={this.name}
            onChange={event => this.updateName(event.target.value)}/>
            {this.state.name.touched && (
              <ValidationError message={nameError} />
            )}
        </div>
        <div>
          <button
            type="submit"
            className="AddFolder-button"
            disabled={
            this.validateName()
            }
            onClick={this.handleClickSave}
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}


export default AddFolder;