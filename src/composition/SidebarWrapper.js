import React from 'react';
import PropTypes from 'prop-types';

function SidebarWrapper(props) {
  return (
    <nav>
      <div className="sidebar__container">
        {props.children}
      </div>
    </nav>
  );
}

SidebarWrapper.propTypes = {
  value: PropTypes.string
};

export default SidebarWrapper; 