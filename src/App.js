/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import prevIcon from './assets/icons/prevIcon.png'
import playIcon from './assets/icons/playIcon.png'
import pauseIcon from './assets/icons/pauseIcon.png'
import nextIcon from './assets/icons/nextIcon.png'
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

  async function play() {
      const tab =  getCurrentTab().then((tab)=>{
           chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['js/content.js'] }, (result) => {
    })
   });
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="controls-player" ><img className='prev-icon' src={prevIcon} alt='play icon'/>
            <img className='play-icon' src={playIcon} alt='play icon' onClick={play}/>
            <img className='pause-icon' src={pauseIcon} alt='play icon'/>
            <img className='next-icon' src={nextIcon} alt='play icon'/>
          </div>
              <div className="songPlaying">
            {currentSong.title}
            {currentSong.artiste}
          </div>
            <ProgressBar progress={currentSong.currentProgress} />
          </div>
       </header>
              <img className="img-current-song" src={currentSong.img} alt="no-img" />
          </div>
    );
  }

export default App;
