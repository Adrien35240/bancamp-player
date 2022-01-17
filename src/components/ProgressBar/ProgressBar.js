
import React from 'react';

function ProgressBar({ progress ,timeElasped,timeDuration}) {

if(!progress){
  progress = 0
  timeElasped = 0
  timeDuration = 0
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
    padding: '2px',
    color: '#816FF7',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${timeElasped}/${timeDuration}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
