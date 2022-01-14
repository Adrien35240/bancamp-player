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
  // send initPopup msg to sw when extension open
  chrome.runtime.sendMessage({ msgPp: "initPopup" })
  chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.msgBg === "init ok") {
      console.log(msg.msgBg)
    }
  })
  chrome.runtime.sendMessage({ msgPp: "listsRequest" })
  chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.msgBg === "list demandée") {
      console.log(msg.msgBg)
    }
  })
 useEffect(() => {
   //chrome.runtime.onMessage.addListener((request, sender, reply) => {
       //setCurrentSong(request.currentSong);
     //});
  });

  async function getCurrentTab() {
     const queryOptions = { active: true, currentWindow: true };
     const [tab] = await chrome.tabs.query(queryOptions);
     return tab;
  }
  async function play() {
      // const tab = await getCurrentTab()
      // chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['js/content.js'] })
  }
    function prev(){
    // port.postMessage({control: "prev"})
   } 
   function pause(){
      //   port.postMessage({ control: "next"  });
  }
    function next(){
//    port.postMessage({msg: "hello" })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="controls-player" >
            <img className='prev-icon' src={prevIcon} alt='play icon' onClick={prev}/>
            <img className='play-icon' src={playIcon} alt='play icon' onClick={play}/>
            <img className='pause-icon' src={pauseIcon} alt='play icon' onClick={pause}/>
            <img className='next-icon' src={nextIcon} alt='play icon' onClick={next}/>
          </div>
              <div className="song-playing">
                <div> {currentSong.title}</div>
                <div>{currentSong.artiste}</div>
          </div>
            <ProgressBar progress={currentSong.currentProgress} />
          </div>
       </header>
              <img className="img-current-song" src={currentSong.img} alt="no-img" />
          </div>
    );
  }

export default App;
