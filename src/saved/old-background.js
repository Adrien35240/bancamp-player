/* eslint-disable no-undef */
// recupere l'id
const bg = {
    //set the default url for create tab when extension installed
    url: "https://bandcamp.com/cmgriffing",
    tabBandcamp: null,
    port: null,
    /**
     * Service worker initialization
     */
    async init() {
        // lorsque l'on clique sur l'extension
        // cree un port de communication contentScript<>SW
        bg.tabBandcamp = await bg.getTab()
        bg.port = chrome.tabs.connect(bg.tabBandcamp.id, { name: "bandcamp-port" })
        bg.createPortConnection()
    },
    /**
     * create a permanent communication port with chrome tab
     */
    async createPortConnection() {
        console.log('port', bg.port)
        bg.port.postMessage({ msgBg: "connection request" })
        bg.port.onMessage.addListener(function (msg) {
            if (msg.msgCs === "port connected") {
                console.log(msg.msgCs)
            }
        })
    },
    /**
     * get infos from current tab
     * @returns {Promise} Promise object represents the current tab
     */
    async getTab() {
        const tabs = await chrome.tabs.query({})
        for (let tab of tabs) {
            if (tab.url === bg.url) {
                return tab
            }
        }
    },
    getList() {
        console.log('getList')
        bg.port.postMessage({ lists: "listsRequest" })
        console.log('whaiting lists')
        bg.port.onMessage.addListener(function (result) {
            console.log('message recu list?')
            if (result.lists) {
                console.log('result lists', result.lists)
            }
        })
    }
}
// call init func when extension open 
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.msgPp === "initPopup") {
        bg.init()
    }

})
// call init func when extension open 
chrome.runtime.onMessage.addListener((msg) => {
    // si extension demande la lists
    if (msg.msgPp === "listsRequest") {
        chrome.runtime.sendMessage({ msgBg: "list demandée" })
        bg.getList()
    }
})