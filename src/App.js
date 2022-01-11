/* eslint-disable no-undef */
import {useState} from 'react'
import './App.css';

function App(){
  const [playingSongInfos,setPlayingSongInfos]=useState('');

  async function getCurrentTab() {
   let queryOptions = { active: true, currentWindow: true };
    await chrome.tabs.query(queryOptions,(tab)=>{
    console.log('tab query',)
    return tab;
    })}
  function init(){
    const tab = getCurrentTab()
    listenerInit()
      chrome.tabs.executeScript(tab.id,{code: 'let id = 0'},function(){
    chrome.tabs.executeScript(tab.id,{file:'./init.js'},function(result){
        console.log('script init send',result)
        chrome.tabs.executeScript(tab.id,{file:'./playing.js'},function(result){
         console.log('script playing send',result)
    })

    })
    })
    }
   /* 
 function playPause() {
    const tab = getCurrentTab()
 listener()  
   console.log('tab inject ',tab)
   chrome.tabs.executeScript(tab.id,{code:'let config ='+ JSON.stringify(config)},function(){
   chrome.tabs.executeScript(tab.id,{file:'./inject.js'}, function (data){
      console.log('retour script',data)
      setPlayingSongInfos(data[0])
     chrome.tabs.executeScript(tab.id,{file:'./playing.js'},function(data){
       console.log('Song start',data)
     })
    })
   })
   }
   */
  function listenerInit(){
 chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  console.log('sender',sender)
  console.log('request',request.currentSong)
      sendResponse({message: "song send ok"});
    setPlayingSongInfos(request.currentSong)
  }
);


  }
   return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={init}>Play</div>
        <div className="songPlaying">{playingSongInfos.title} {playingSongInfos.artiste}</div>
        <img className="img-current-song" src={playingSongInfos.img} alt="no-img"/>
      </header>
    </div>
  );
}

export default App;
