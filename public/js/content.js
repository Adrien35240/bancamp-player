/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const displayTheWholeList = document.querySelector('.show-more');
displayTheWholeList.click();
const lists = document.querySelectorAll('.collection-item-container');
let id = 0;
playing(id);
function playing(listId) {
  let myInterval = null;
  lists[listId].classList.toggle('playing');
  const btnPlay = lists[listId].querySelector('.item_link_play_bkgd');
  btnPlay.click();
  const songTitle = lists[listId].querySelector('.collection-item-title').innerText;
  const songArtiste = lists[listId].querySelector('.collection-item-artist').innerText;
  const songImg = lists[listId].querySelector('.collection-item-art').getAttribute('src');
  const result = {
    title: songTitle,
    artiste: songArtiste,
    img: songImg,
  };
  const progressBar = document.querySelector('.progress');
  myInterval = setInterval(() => {
    currentProgress = progressBar.getAttribute('style').substring(7, 10)
    result.currentProgress = Number(currentProgress);
    chrome.runtime.sendMessage({ currentSong: result });
    console.log('current song ', result);
    if (currentProgress.toString() === '100') {
      console.log('song end');
      clearInterval(myInterval);
      id += 1;
      playing(id);
    }
  }, 500);
}
