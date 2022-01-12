/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState('');

  function createListener() {
    chrome.runtime.onConnect.addListener((port) => {
      console.assert(port.name === 'song');
      port.onMessage.addListener((data) => {
        console.log('current song', data.currentSong);
        setCurrentSong(data.currentSong);
      });
    });
  }
  async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  async function init() {
    createListener();
    const tab = await getCurrentTab();
    console.log('current tab ', tab.id);
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['js/content.js'] }, (result) => {
      console.log('script send', result);
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
      </header>
    </div>
  );
}

export default App;
