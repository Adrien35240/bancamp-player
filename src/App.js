/* eslint-disable no-undef */
import {useEffect,useState} from 'react'
import './App.css';

function App(){
  const [playingSongTitle,setPlayingSongTitle]=useState('');

  useEffect(()=>{
  })

  async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

 function injectTheScript() {
    const tab = getCurrentTab()
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
