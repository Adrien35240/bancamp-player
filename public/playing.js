/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const port = chrome.runtime.connect({ name: 'song' });

playing(id);
function playing(id) {
  console.log('id to find', id);
  let myInterval = null;
  lists = document.querySelectorAll('.collection-item-container');
  lists[id].classList.toggle('playing');
  const btnPlay = lists[id].querySelector('.item_link_play_bkgd');
  btnPlay.click();
  const songTitle = lists[id].querySelector('.collection-item-title').innerText;
  const songArtiste = lists[id].querySelector('.collection-item-artist').innerText;
  const songImg = lists[id].querySelector('.collection-item-art').getAttribute('src');
  const result = {
    title: songTitle,
    artiste: songArtiste,
    img: songImg,
  };
  console.log('result', result);
  port.postMessage({ currentSong: result });
  const progressBar = document.querySelector('.progress');
  myInterval = setInterval(() => {
    currentProgress = progressBar.getAttribute('style').substring(7, 10);
    console.log('current progress', currentProgress);
    if (currentProgress.toString() === '100') {
      console.log('song end');
      clearInterval(myInterval);
      id += 1;
      playing(id);
    }
  }, 2000);
}
