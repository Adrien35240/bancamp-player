/* eslint-disable no-undef */
const bg = {
  init() {
    console.log('background loaded ...')
    this.receiveList()
  },
  receiveList() {
    chrome.runtime.onMessage.addListener(
      function (req, send, res) {
        console.log(send.tab ?
          "from a content script:" + send.tab.url :
          "from the extension");
        if (req.status === "sendList") {
          console.log('list :', req.list)
          console.log('list 0',req.list[0])
          res({ status: "list received" });
          return true
        } else {
          res({ status: "error received list" })
          return true
        }
      }
    );
  }
}

bg.init()
