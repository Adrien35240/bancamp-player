/* eslint-disable no-undef */
const bg = {
  list:[],
  init() {
    console.log('background loaded ...')
    this.listener()
  },
  listener() {
    chrome.runtime.onMessage.addListener((req, send, response) => {
      if (req.status === "loading") {
        //TODO: faire une promesse de la fonction suivante
        function getList() {
            return new Promise(function (resolve, reject) {
              chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
                chrome.tabs.sendMessage(tabs[0].id, { status: "loading" }, (res)=>{ 
                if (res.status === 'list received...') {
                  resolve(res)
                  }
                });
              });
            return true
          }) 
        }
        getList().then((data) => {
                console.log('2- sw: get list', data.list)
            response({ status: 'list sending end...', list: data.list })
        })
      }
    return true
    })
  }
}

bg.init()
