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
    
 function injectTheScript() {
    const tab = getCurrentTab()
   console.log('tab inject ',tab)
    chrome.tabs.executeScript(tab.id,{file:'./inject.js'}, function (data){
      console.log('retour script',data)
      setPlayingSongInfos(data[0])
    })
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={injectTheScript}>Play</div>
        <div className="songPlaying">{playingSongInfos.title} {playingSongInfos.artiste}</div>
        <img className="img-current-song" src={playingSongInfos.img} alt="no-img"/>
      </header>
    </div>
  );
}

export default App;
