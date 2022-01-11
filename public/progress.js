/* eslint-disable no-undef */
   const progressBar = document.querySelector('.progress')
 const myInterval = setInterval(function(){
currentProgress = progressBar.getAttribute('style').substring(7,10)
         console.log('current progress',currentProgress)
         if(currentProgress.toString()==="100"){
            console.log('song end')
              chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
             console.log(response.farewell);
});                 clearInterval(myInterval);

}
 }, 2000); 


