/* eslint-disable no-undef */
import {useEffect,useState} from 'react'
import './App.css';

function App(){
  const [playingSongTitle,setPlayingSongTitle]=useState('');

  async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
    await chrome.tabs.query(queryOptions,(tab)=>{
    console.log('tab query',tab)
    return tab;
    });
}

 function injectTheScript() {
    const tab = getCurrentTab()
   console.log('tab inject ',tab)
    chrome.tabs.executeScript(tab.id,{file:'./inject.js'}, function (data){
      console.log('retour script',data)
      setPlayingSongTitle(data[0])
    })
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={injectTheScript}>Play</div>
        <div className="songPlaying">{playingSongTitle}</div>
      </header>
    </div>
  );
}

export default App;
