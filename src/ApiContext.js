import React from 'react'

/* The contextType property on a class can be assigned a Context object created by React.createContext().
This lets you consume the nearest current value of that Context type using this.context.
You can reference this in any of the lifecycle methods including the render function. */
const ApiContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  updateFolder: () => {},
})

export default ApiContext