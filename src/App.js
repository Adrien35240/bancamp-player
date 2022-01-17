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
  const url = "https://bandcamp.com/cmgriffing"
  const [currentSong, setCurrentSong] = useState([]);
  const [progressBar,setProgressBar] = useState('')

  useEffect(() => {
    getList().then((data) => {
      songs.current = data.list
      index.current = data.index
      setCurrentSong(songs.current[0])
    })
    chrome.runtime.onMessage.addListener((request, sender, reply) => {
      setCurrentSong(Object.values(request)[1])
      setProgressBar(Object.values(request)[0]);
    })
  }, [])

   async function getTab() {
    const tabs = await chrome.tabs.query({})
    for (let tab of tabs) {
      if (tab.url === url) {
        return tab
      }
    }
  }

  async function getList() {
    const tab = await getTab()
    return new Promise((resolve,reject) => {
       chrome.runtime.sendMessage({ status: "loadingInit" ,tabId : tab.id},(res) => {
        if (res.status === 'list sending end...') {
              console.log("ext:",res)
              resolve(res) 
            }
       })
      return true
    })
 }
  
 async function play(e) {
   e.preventDefault()
   //TODO: toggle le bouton play/pause
    const tab = await getTab()
    console.log('play')
    chrome.tabs.sendMessage(tab.id,{ status: "playing", index:index.current }, (res) => {
      if (res.status === 'playing start ...') {
        console.log(res.status)
      }
    })
  }

  async function prev(e) {
    e.preventDefault()
    const tab = await getTab()
    console.log('prev')
    chrome.tabs.sendMessage(tab.id, { status: "prevSong"}, (res) => {
      if (res.status === 'playing start ...') {
        console.log(res.status)
      }
    })
  }

  async function next(e) {
    e.preventDefault()
    const tab = await getTab()
    console.log('prev')
    chrome.tabs.sendMessage(tab.id, { status: "nextSong"}, (res) => {
      if (res.status === 'playing start ...') {
        console.log(res.status)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header__title">bandcamp-player</div>
        <div className="header-container">
          <div className="controls-player" >
            <img className='prev-icon' src={prevIcon} alt='play icon' onClick={prev}/>
            <img className='play-icon' src={playIcon} alt='play icon' onClick={play}/>
            <img className='next-icon' src={nextIcon} alt='play icon' onClick={next}/>
          </div>
              <div className="song-playing">
            <div className='song-playing__title'> {currentSong.songTitle}</div>
            <div className='song-playing__artiste'>{currentSong.songArtiste}</div>
          </div>
             <ProgressBar progress={progressBar} /> 
          </div>
       </header>
      <img className="img-current-song" src={currentSong.songImg} alt="no-img => refresh bandcamp page & close/open player" />
      <div>
        {/* <div className='playlist-button' >Playlist</div>
          <div className='playlist-list'><Playlist /></div> */}
      </div>
          </div>
    );
  }

export default App;
