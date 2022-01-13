/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const msg = 'hello worker';

chrome.runtime.onMessage.addListener((request, sender, reply) => {
  console.log('sw:progression :', request.currentSong);
  return true;
});
