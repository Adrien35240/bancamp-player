/* eslint-disable no-undef */
const cs = {
  list:[],
  init() {
    console.log('contentScript loaded')
    this.sendList()
  },
  sendList() {
    //get list of element
    const buff = document.querySelectorAll('.collection-item-container');
    for (let el of buff) {
      const songTitle = el.querySelector('.collection-item-title').innerText;
      const songArtiste = el.querySelector('.collection-item-artist').innerText;
      const songImg = el.querySelector('.collection-item-art').getAttribute('src');
      this.list.push({songTitle,songArtiste,songImg})
    }
    console.log('list :',this.list)
    chrome.runtime.sendMessage({ status: "sendList", list: this.list}, (res) => {
      console.log('send list status :', res.status);
      return true
    });
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