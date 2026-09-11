import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Loading ReliefHub data...', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="relief-loading-fullscreen">
        <div className="relief-spinner" />
        <p className="relief-loading-text">{message}</p>
      </div>
    );
  }

  return (
    <div className="relief-loading-inline">
      <div className="relief-spinner" />
      {message && <p className="relief-loading-text">{message}</p>}
    </div>
  );
};

export default Loading;
