/* eslint-disable no-undef */
import React, { useState } from 'react';
import Playlist from './components/Playlist/Playlist'
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import prevIcon from './assets/icons/prevIcon.png'
import playIcon from './assets/icons/playIcon.png'
import pauseIcon from './assets/icons/pauseIcon.png'
import nextIcon from './assets/icons/nextIcon.png'
import './App.css';

function App() {
  let currentSongBuff = []
  const [currentSong, setCurrentSong] = useState([]);

  function getList() {
    return new Promise((resolve,reject) => {
       chrome.runtime.sendMessage({ status: "loading" },(res) => {
        if (res.status === 'list sending end...') {
              console.log("ext:",res.status)
              console.log('ext: list :', res.list[0])
              //currentSongBuff = res.list[0]
              resolve(res) 
            }
       })
      return true
    })
  }

   getList().then((data) => {
     console.log('ext: data :', data)
  //   setCurrentSong(currentSongBuff)
  //   console.log('ext currentSong :',currentSong)
   })
 


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
            {/* <ProgressBar progress={currentSong.currentProgress} /> */}
          </div>
       </header>
      <img className="img-current-song" src={currentSong.img} alt="no-img" />
      <div>
        <div className='playlist-button' >Playlist</div>
          <div className='playlist-list'><Playlist /></div>
      </div>
          </div>
    );
  }

export default App;
