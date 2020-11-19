import React from 'react';
import PropTypes from 'prop-types';

class AddNoteError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };  
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // We can log the error to an error reporting service but we will just console.log
    console.log(error, errorInfo);
  }

  render() {   
    if (this.state.hasError) {      
      return (
        <h2>Could not display note entry form.</h2>
      );
    }
    return this.props.children;
  }
}

AddNoteError.propTypes = {
  value: PropTypes.string
};

export default AddNoteError; 