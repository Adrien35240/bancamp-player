/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import Playlist from './components/Playlist/Playlist'
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import prevIcon from './assets/icons/prevIcon.png'
import playIcon from './assets/icons/playIcon.png'
import nextIcon from './assets/icons/nextIcon.png'
import './App.css';

function App() {
  const songs = useRef(null)
  const index = useRef(null)
  const pageStatus = useRef(false)
  const url = "https://bandcamp.com/"
  const [currentSong, setCurrentSong] = useState([]);
  const [progressBar, setProgressBar] = useState('')
  const [timeElasped, setTimeElasped] = useState('')
  const [timeDuration, setTimeDuration] = useState('')

  useEffect(() => {
    getList().then((data) => {
      songs.current = data.list
      index.current = data.index
      pageStatus.current = data.pageStatus
      setCurrentSong(songs.current[0])
    })
    chrome.runtime.onMessage.addListener((request, sender, reply) => {
      console.log('ext:request', request)
      setProgressBar(Object.values(request)[0]);
      setCurrentSong(Object.values(request)[1])
      setTimeElasped(Object.values(request)[3])
      setTimeDuration(Object.values(request)[4])
    })
  }, [])

  async function getTab() {
      const tabs = await chrome.tabs.query({})
      for (let tab of tabs) {
      //TODO: improve tab detection(here return first collection tab find)
      if (tab.url.includes(url) /*&& pageStatus.current===true*/) {
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
        <div>
          <div className="App-header__title">bandcamp-player</div>
          <div className="App-header__version">beta-v0.3</div>
        </div>
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
          <ProgressBar progress={progressBar} timeElasped={timeElasped} timeDuration={timeDuration} /> 
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
