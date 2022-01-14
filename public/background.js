/* eslint-disable no-undef */
// recupere l'id
const bg = {
  //set the default url for create tab when extension installed
  domaine:"https://bandcamp.com/*",
  url: "https://bandcamp.com/cmgriffing",
  tabBandcamp:null,
  /**
   * Service worker initialization
   */
 async init() {
    console.log('click detected')
    // lorsque l'on clique sur l'extension
    // cree un port de communication extension>SW
   bg.tabBandcamp = await bg.getTab()
   console.log('init',bg.tabBandcamp)
    bg.createPortConnection()
    // cree un port de communication SW>ContentScript
    
    
  },
  /**
   * Create a new tab in chrome with url 
   */
 async handleInstalled() {
    console.log("SW installed & running")
    chrome.tabs.create({
      url: bg.url
    });
   bg.tabBandcamp = await bg.getInstallTabId()
   console.log('handleInstall tab id', bg.tabBandcamp.id)
  },
  /**
   * create a permanent communication port with chrome tab
   */
 async createPortConnection() {
   console.log('tab id', bg.tabBandcamp)
   //error after
   console.log('if for port ',bg.tabBandcamp.id)
   const port = chrome.tabs.connect(bg.tabBandcamp.id, { name: "knockknock" });
   console.log('port',port)
   port.postMessage({ msgBg: "hello c'est le bg" })
   port.onMessage.addListener(function (msg) {
     if (msg.msgCs === "bonjour bg,j ai bien recu ton message"){
     console.log(msg.msgCs)
     }
   })
   //open popup
  },
  /**
   * get infos from current tab
   * @returns {Promise} Promise object represents the current tab
   */
  async getTab() {
   const tabs = await chrome.tabs.query({})
    for (let tab of tabs) {
      console.log('tab', tab)
      if (tab.url === bg.url) {
        console.log('tab id find', tab.id)
        return tab
      }
    }
  },
//   async getInstallTabId() {
//    const queryOptions = { active: true, currentWindow: true };
//     const [tab]= await chrome.tabs.query(queryOptions);
//     console.log('installed tab')
//      return tab;
// }
}
  // Listener when extension installed
//chrome.runtime.onInstalled.addListener(bg.handleInstalled);
// when extension icon was click
chrome.action.onClicked.addListener(bg.init);

