/* eslint-disable react/style-prop-object */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

function ProgressBar({ progress }) {


  const containerStyles = {
    height: 20,
    width: '100px',
    backgroundColor: "#e0e0de",
  }

  const fillerStyles = {
    height: '14px',
    width: `${progress}%`,
    backgroundColor: "blue",
    textAlign: 'left'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
