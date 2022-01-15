/* eslint-disable no-undef */
const cs = {
  list:[],
  init() {
    console.log('contentScript loaded')
    this.listener()
  },
  /**
  * Send attributs from all songs in DOM to SW
  * @returns {boolean} 
  */
  getList() {
    this.list = []
    //get list of element
    const buff = document.querySelectorAll('.collection-item-container');
    //get attributs from songs Element
    for (let el of buff) {
      const songTitle = el.querySelector('.collection-item-title').innerText;
      const songArtiste = el.querySelector('.collection-item-artist').innerText;
      const songImg = el.querySelector('.collection-item-art').getAttribute('src');
      //add to global list array
      this.list.push({ songTitle, songArtiste, songImg })
    }
  },
  listener() {
    chrome.runtime.onMessage.addListener(
    (req, send, res) => {
        if (req.status === "loading") {   
          this.getList()
          console.log('cs: list :',this.list)
          res({ status: "list received...", list: this.list })     
        } else {
          res({ status: "error sending list to SW" })
        }
      }
    );
  }
}

cs.init()

// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name === "bandcamp-player");
//   port.onMessage.addListener(function(msg){
//     console.log('msg',msg)
//     port.postMessage({answer:"message bien recu"})
//   })
// });

//const displayTheWholeList = document.querySelector('.show-more');
//displayTheWholeList.click();
// const lists = document.querySelectorAll('.collection-item-container');
// let id = 0;
// playing(id);
// function playing(listId) {
//   let myInterval = null;
//   lists[listId].classList.toggle('playing');
//   const btnPlay = lists[listId].querySelector('.item_link_play_bkgd');
//   btnPlay.click();
//   const songTitle = lists[listId].querySelector('.collection-item-title').innerText;
//   const songArtiste = lists[listId].querySelector('.collection-item-artist').innerText;
//   const songImg = lists[listId].querySelector('.collection-item-art').getAttribute('src');
//   const result = {
//     id:listId,
//     title: songTitle,
//     artiste: songArtiste,
//     img: songImg,
//   };
//   const progressBar = document.querySelector('.progress');
//   myInterval = setInterval(() => {
//     currentProgress = progressBar.getAttribute('style').substring(7, 10)
//     result.currentProgress = Number(currentProgress);
//     chrome.runtime.sendMessage({ currentSong: result });
//     console.log('current song ', result);
//       if (currentProgress.toString() === '100') {
//       console.log('song end');
//       clearInterval(myInterval);
//       listId += 1;
//       playing(ListId);
//     }
//   }, 500);
// }