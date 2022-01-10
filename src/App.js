/* eslint-disable no-undef */
import './App.css';
function App(){
 async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


  function injectTheScript() {
    console.log('inject script')
    const tab = getCurrentTab()
    console.log('tab',tab)
    chrome.tabs.executeScript(tab.id,{file:'./inject.js'})
}

  return (
    <div className="App">
      <header className="App-header">
        <div className="playBtn" onClick={injectTheScript}>Play</div>
      </header>
    </div>
  );
}

export default App;
