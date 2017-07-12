//var selenium = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
// let browser = {browser: new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build(),
//                  inUse:false};
// let browser2 = {browser: new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build(),
//                  inUse:false};
                 
let browser3 = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build()

// var count = 0

// var browsers = [ browser , browser2]

const fetchSingleDownloadLink = function getData(videoID, cb){

          //DO STUFF
   const youtubeLink = 'https://www.youtube.com/watch?v=' + videoID

    browser3.get('https://www.ytmp3.cc')
    browser3.findElement(webdriver.By.id('input')).sendKeys(youtubeLink).then((inputField)=>{

    browser3.findElement(webdriver.By.id('submit')).click()

    var refreshID = setInterval(()=>{

        browser3.findElement(webdriver.By.id('file')).getAttribute("href").then((data)=>{

          if(data != ''){
            console.log('got link - :', data)
            clearInterval(refreshID)
            
            cb(data)
          }


        })
        .catch((err)=>{
          console.log(err)
        })

      }, 1500)

    })



}

const fetchDownloadLinks = function getData(youtubeArray, cb){
  

  youtubeArray.forEach((id_title_downloadLink)=>{
    //let haveBrowser = false
    var iid = setInterval(()=>{
      for(let x = 0; x<browsers.length ; x++){
        if(browsers[x].inUse == false){
          console.log('using browser', id_title_downloadLink.id )
          browsers[x].inUse = true
          console.log('using browser set', id_title_downloadLink.id)
          clearInterval(iid)

          //DO STUFF
              const youtubeLink = 'https://www.youtube.com/watch?v=' + id_title_downloadLink.id

    browsers[x].browser.get('https://www.ytmp3.cc')
    browsers[x].browser.findElement(webdriver.By.id('input')).sendKeys(youtubeLink).then((inputField)=>{
      //console.log(inputField)

      browsers[x].browser.findElement(webdriver.By.id('submit')).click()

    var refreshID = setInterval(()=>{

        browsers[x].browser.findElement(webdriver.By.id('file')).getAttribute("href").then((data)=>{
          console.log('got link - :', data)
          clearInterval(refreshID)
          browsers[x].inUse = false
          id_title_downloadLink.downloadLink = data
          let checkArray = youtubeArray.map((e)=>{
              if(typeof e.downloadLink !== 'undefined')
                return 1 
              else 
                return 0
          }).reduce((acc,curr)=>{
            return acc+curr
          },0)
          console.log('procssed:', checkArray)
          if(checkArray == youtubeArray.length){
            cb(youtubeArray)
          }
          else{
            
            //DO NOTHING. youtubedata.downloadLink needs to be updated for all
          }

          
        })
        .catch((err)=>{
          console.log(err)
        })

      }, 2000)

    })
    break;

          
        }
        else{
          //console.log('browser in use')
          //IF browser is in use, do nothing
        }

      }
    },1000)



  })

}
          //browser.quit()

module.exports = {fetchSingleDownloadLink,fetchDownloadLinks};