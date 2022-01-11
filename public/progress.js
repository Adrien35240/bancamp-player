/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const progressBar = document.querySelector('.progress');
const myInterval = setInterval(() => {
  currentProgress = progressBar.getAttribute('style').substring(7, 10);
  console.log('current progress', currentProgress);
  if (currentProgress.toString() === '100') {
    console.log('song end');
    chrome.runtime.sendMessage({ endSong: 'true' }, (response) => {
      console.log(response.farewell);
    }); clearInterval(myInterval);
    playing(id++);
  }
}, 2000);
