/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import './App.css';

function App() {
  const [playingSongInfos, setPlayingSongInfos] = useState('');

  function listenerInit() {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        console.log('sender', sender);
        console.log('request', request.currentSong);
        sendResponse({ message: 'song send ok' });
        setPlayingSongInfos(request.currentSong);
      },
    );
  }

  async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    await chrome.tabs.query(queryOptions, (tab) => {
      console.log('tab query');
      return tab;
    });
  }
  function init() {
    const tab = getCurrentTab();
    listenerInit();
    chrome.tabs.executeScript(tab.id, { code: 'let id = 0' }, () => {
      chrome.tabs.executeScript(tab.id, { file: './init.js' }, (resultInit) => {
        console.log('script init send', resultInit);
        listenerInit();
        chrome.tabs.executeScript(tab.id, { file: './playing.js' }, (resultPlaying) => {
          console.log('script playing send', resultPlaying);
        });
      });
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={init}>Play</div>
        <div className="songPlaying">
          {playingSongInfos.title}
          {' '}
          {playingSongInfos.artiste}
        </div>
        <img className="img-current-song" src={playingSongInfos.img} alt="no-img" />
      </header>
    </div>
  );
}

export default App;
