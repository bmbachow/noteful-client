import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';

export default function NavCircleButton(props) {
  /* ... is a spread operator. spreads over the object and get all its properties.
  then overwrite the existing properties with the ones we're passing.*/
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.propTypes = {
  tag: PropTypes.any,
  className: PropTypes.string
}

NavCircleButton.defaultProps = {
  tag: 'a',
}