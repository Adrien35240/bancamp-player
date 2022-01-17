/* eslint-disable no-undef */
const cs = {
  list: [],
  pageType: null,
  pageStatus:false,
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
    this.listElement = document.querySelectorAll('.collection-item-container');
    for (let el of this.listElement) {
      const songTitle = el.querySelector('.collection-item-title').innerText;
      const songArtiste = el.querySelector('.collection-item-artist').innerText;
      const songImg = el.querySelector('.collection-item-art').getAttribute('src');
      this.list.push({ songTitle, songArtiste, songImg })
    }
  },
  getColletionPageStatus() {
    this.pageType = document.title
    console.log('cs: this pageType',this.pageType)
    if (this.pageType.includes('Collection')) {
      this.pageStatus = true
    } else {
      this.pageStatus = false
    }
  },
  listener() {
    chrome.runtime.onMessage.addListener(
      (req, send, res) => {
        if (req.status === "loading") {
          this.getColletionPageStatus()
          this.getList()
          res({ status: "list received...", list: this.list , index: this.index, pageStatus:this.pageStatus })
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
      if (req.status === 'prevSong') {
        if (this.index > 0) {
          this.index--
          this.playing()
        res({ status: 'playing start ...' })
        } else {
          this.index = this.list.length-1
          this.playing()
          res({ status: 'playing start ...' })
        }
      }
      if (req.status === 'nextSong') {
       if (this.index < this.list.length-1) {
          this.index++
          this.playing()
        res({ status: 'playing start ...' })
       } else {
         this.index = 0
         this.playing()
         res({status: 'playing start ...'})
        }
      }
    })
  },
  playing() {
    this.listElement[this.index].classList.toggle('playing');
    const btnCurrentSong = this.listElement[this.index].querySelector('.item_link_play_bkgd');
    btnCurrentSong.click();
    this.progressBar()
  },
  progressBar() {
  this.progressBarElement = document.querySelector('.progress');
  this.interval = setInterval(() => {
    this.currentProgress = this.progressBarElement.getAttribute('style').substring(7, 10)
    this.currentProgress = Number(this.currentProgress);
    chrome.runtime.sendMessage({ progessBar: this.currentProgress, list: this.list[this.index], index: this.index });
      if (this.currentProgress.toString() === '100') {
      clearInterval(this.interval);
      this.index += 1;
      this.playing();
    }
  }, 500);
  },
}

cs.init()
