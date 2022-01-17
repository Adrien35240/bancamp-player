/* eslint-disable no-undef */
const bg = {
  list: [],
  pageStatus:false,
  index:null,
  async init() {
    console.log('background loaded ...')
    this.listener()
  },
 async listener() {
    chrome.runtime.onMessage.addListener((req, send, response) => {
      if (req.status === "loadingInit") {
                chrome.tabs.sendMessage(req.tabId, { status: "loading" }, (res)=>{ 
                  if (res.status === 'list received...') {
                    this.list = res.list
                    this.index = res.index
                    this.pageStatus = res.pageStatus
                  response({ status: 'list sending end...', list: this.list, index: this.index , pageStatus: this.pageStatus})
                  }
                });
        }
      return true
      })
  }
}

bg.init()
