/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState('');
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, reply) => {
      setCurrentSong(request.currentSong);
    });
  });

  async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  async function init() {
    const tab = await getCurrentTab();
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['js/content.js'] }, (result) => {
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={init}>Play</div>
        <div className="songPlaying">
          {currentSong.title}
          {' '}
          {currentSong.artiste}
        </div>
        <img className="img-current-song" src={currentSong.img} alt="no-img" />
        <ProgressBar progress={currentSong.currentProgress} />
      </header>
    </div>
  );
}

export default App;
