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

if(!progress){
  progress = 0
}
  const containerStyles = {
    height: '14px',
    width: '100%',
    backgroundColor: "#e0e0de",
  }

  const fillerStyles = {
    height: '14px',
    width: `${progress}%`,
    backgroundColor: "rgba(50, 50, 50, 1)",
    textAlign: 'left'
  }

  const labelStyles = {
    color:'white',
    padding: '2px',
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
