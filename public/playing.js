/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
playing(id);
function playing(id) {
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
  chrome.runtime.sendMessage({ currentSong: result }, (response) => {
    console.log('response from extension', response.message);
  });
  const progressBar = document.querySelector('.progress');
  const myInterval = setInterval(() => {
    currentProgress = progressBar.getAttribute('style').substring(7, 10);
    console.log('current progress', currentProgress);
    if (currentProgress.toString() === '100') {
      console.log('song end');
      chrome.runtime.sendMessage({ endSong: 'true' }, (response) => {
        console.log(response.farewell);
      }); clearInterval(myInterval);
      id += 1;
      playing(id);
    }
  }, 2000);
}
