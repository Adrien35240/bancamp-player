/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import Playlist from './components/Playlist/Playlist'
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import prevIcon from './assets/icons/prevIcon.png'
import playIcon from './assets/icons/playIcon.png'
import pauseIcon from './assets/icons/pauseIcon.png'
import nextIcon from './assets/icons/nextIcon.png'
import './App.css';

function App() {

  const [currentSong, setCurrentSong] = useState('');

  

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="controls-player" >
            <img className='prev-icon' src={prevIcon} alt='play icon' />
            <img className='play-icon' src={playIcon} alt='play icon' />
            <img className='pause-icon' src={pauseIcon} alt='play icon' />
            <img className='next-icon' src={nextIcon} alt='play icon'/>
          </div>
              <div className="song-playing">
                <div> {currentSong.title}</div>
                <div>{currentSong.artiste}</div>
          </div>
            <ProgressBar progress={currentSong.currentProgress} />
          </div>
       </header>
      <img className="img-current-song" src={currentSong.img} alt="no-img" />
      <div>
        <div className='playlist-button' onClick={DisplayPlaylist}>Playlist</div>
          <div className='playlist-list'><Playlist /></div>
      </div>
          </div>
    );
  }

export default App;
