/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import Playlist from './components/Playlist/Playlist'
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import prevIcon from './assets/icons/prevIcon.png'
import playIcon from './assets/icons/playIcon.png'
import pauseIcon from './assets/icons/pauseIcon.png'
import nextIcon from './assets/icons/nextIcon.png'
import './App.css';

function App() {
  const songs = useRef(null)
  const index = useRef(null)
  const tabId = useRef(null)
  const [currentSong, setCurrentSong] = useState([]);
  const [progressBar,setProgressBar] = useState('')

  useEffect(() => {
    getList().then((data) => {
      songs.current = data.list
      index.current = data.index
      tabId.current = data.tabId
      setCurrentSong(songs.current[0])
    })
    chrome.runtime.onMessage.addListener((request, sender, reply) => {
      setProgressBar(Object.values(request)[0]);
    })
  }, [])

 function getList() {
    return new Promise((resolve,reject) => {
       chrome.runtime.sendMessage({ status: "loading" },(res) => {
        if (res.status === 'list sending end...') {
              console.log("ext:",res)
              resolve(res) 
            }
       })
      return true
    })
 }
  
  function play(e) {
    e.preventDefault()
    console.log('play')
    console.log('ext: tabId',tabId.current)
    chrome.tabs.sendMessage(tabId.current,{ status: "playing", index:index.current }, (res) => {
      if (res.status === 'playing start ...') {
        console.log(res.status)
      }
    })
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="controls-player" >
            <img className='prev-icon' src={prevIcon} alt='play icon' />
            <img className='play-icon' src={playIcon} alt='play icon' onClick={play}/>
            <img className='pause-icon' src={pauseIcon} alt='play icon' />
            <img className='next-icon' src={nextIcon} alt='play icon'/>
          </div>
              <div className="song-playing">
            <div> {currentSong.songTitle}</div>
            <div>{currentSong.songArtiste}</div>
          </div>
             <ProgressBar progress={progressBar} /> 
          </div>
       </header>
      <img className="img-current-song" src={currentSong.songImg} alt="no-img" />
      <div>
        <div className='playlist-button' >Playlist</div>
          <div className='playlist-list'><Playlist /></div>
      </div>
          </div>
    );
  }

export default App;
