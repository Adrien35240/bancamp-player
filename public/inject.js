/* eslint-disable no-undef */
(function(){
let lists = null
   if(!lists){
  lists = document.querySelectorAll('.collection-item-container')
       console.log(lists)
   }
    lists[0].classList.add('playing')
    const btnPlay = lists[0].querySelector('.item_link_play_bkgd')
    btnPlay.click()
  const songTitle = lists[0].querySelector('.collection-item-title').innerText
  const songArtiste = lists[0].querySelector('.collection-item-artist').innerText
   const songImg = lists[0].querySelector('.collection-item-art').getAttribute('src')
  const result ={
      title:songTitle,
      artiste:songArtiste,
     img:songImg
   }
   console.log('result',result)
return result
})()

