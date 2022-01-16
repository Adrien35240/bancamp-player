/* eslint-disable no-undef */
const cs = {
  list: [],
  index: 0,
  interval: null,
  progressBarElement: null,
  currentProgress: 0,
  listElement : null,
  init() {
    console.log('contentScript loaded')
    this.listener()
  },

  getList() {
    this.list = []
    //get list of element
    this.listElement = document.querySelectorAll('.collection-item-container');
    //get attributs from songs Element
    for (let el of this.listElement) {
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
          res({ status: "list received...", list: this.list , index: this.index })
        } else {
          res({ status: "error sending list to SW" })
        }
      }
    );
    chrome.runtime.onMessage.addListener((req, send, res) => {
      if (req.status === 'playing') {
        this.playing()
        res({ status: 'playing start ...'})
      }
    })
  },
  playing() {
    this.listElement[this.index].classList.toggle('playing');
    const btnPlay = this.listElement[this.index].querySelector('.item_link_play_bkgd');
    btnPlay.click();
    //this.sendNewSong()
    this.progressBar()
  },
  progressBar() {
  this.progressBarElement = document.querySelector('.progress');
  this.interval = setInterval(() => {
    this.currentProgress = this.progressBarElement.getAttribute('style').substring(7, 10)
    this.currentProgress = Number(this.currentProgress);
    chrome.runtime.sendMessage({ progessBar: this.currentProgress, list: this.list[this.index], index: this.index });
      if (this.currentProgress.toString() === '100') {
      console.log('song end');
      clearInterval(this.interval);
      this.index += 1;
      this.playing();
    }
  }, 500);
  },
  // sendNexSong() {
  //   //send this.list[index]
  //   chrome.runtime.sendMessage({ status: "new song", list: this.list[this.index], index: this.index }, (res)=>{
      
  //   })

  // }

}

cs.init()
