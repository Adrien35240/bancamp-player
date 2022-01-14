/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
  // controle received

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
let lists = null
console.log('hello content script')
const port = chrome.runtime.onConnect.addListener((port)=>{
    console.assert(port.name === "bandcamp-port")
  console.log('port.name', port.name)
  port.onMessage.addListener(function (msg) {
    if (msg.msgBg === "connection request") {
      console.log(msg.msgBg)
      port.postMessage({ msgCs: "port connected" })
    }
  })
  port.onMessage.addListener(function (msg) {
  if (msg.lists === "listsRequest") {
  lists = document.querySelectorAll('.collection-item-container');
    console.log(lists)
    let result = []
    for (let song of lists) {
   const songTitle = song.querySelector('.collection-item-title').innerText;
  const songArtiste = song.querySelector('.collection-item-artist').innerText;
  const songImg = song.querySelector('.collection-item-art').getAttribute('src');
      const currentSong = { songTitle, songArtiste, songImg }
      console.log('currentSong',currentSong)
      result.push(currentSong)
    }
    console.log('result',result)
    port.postMessage({ lists: result })
  }
  })
  
})


