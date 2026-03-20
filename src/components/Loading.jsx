// src/components/Loading.jsx
import React from 'react';
import loadingGif from '../assets/Loading.gif'; // ✅ renamed


const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src={loadingGif}
        alt="Loading..."
        className="loading-gif"
      />
    </div>
  );
};

export default Loading;
