/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function playing(id){
 lists[id].classList.toggle('playing')
    const btnPlay = lists[id].querySelector('.item_link_play_bkgd')
    btnPlay.click()
  const songTitle = lists[id].querySelector('.collection-item-title').innerText
  const songArtiste = lists[id].querySelector('.collection-item-artist').innerText
   const songImg = lists[id].querySelector('.collection-item-art').getAttribute('src')
  const result ={
      title:songTitle,
      artiste:songArtiste,
     img:songImg
   }
   console.log('result',result)
  chrome.runtime.sendMessage({currentSong: result}, function(response) {
             console.log(response.message);
}); 
}
 playing(id) 
