import React from 'react';
import PropTypes from 'prop-types'

function MainWrapper(props) {
  return (
    <main>
      <div className="main__container">
        {props.children}
      </div>
    </main>
  );
}

MainWrapper.propTypes = {
  title: PropTypes.string
};

export default MainWrapper; 