import React from 'react'
import PropTypes from 'prop-types';

class FormError extends React.Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <p>An error has occured.</p>
            );
        }
        return this.props.children;
    }
}

FormError.propTypes = {
    children: PropTypes.any.isRequired
}

export default FormError;