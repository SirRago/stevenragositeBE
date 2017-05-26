//var selenium = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');

const fetchDownloadLinks = function getData(youtubeArray, cb){
  const youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeArray[0].id

  var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
 
  browser.get('https://www.ytmp3.cc')

  browser.findElement(webdriver.By.id('input')).sendKeys(youtubeLink).then((inputField)=>{
    console.log(inputField)

    browser.findElement(webdriver.By.id('submit')).click()

   var refreshID = setInterval(()=>{

       browser.findElement(webdriver.By.id('file')).getAttribute("href").then((data)=>{
        //console.log(data)
        clearInterval(refreshID)
        browser.quit()
        youtubeArray[0].downloadLink = data
        cb(youtubeArray)
       })
       .catch((err)=>{
        console.log(err)
       })

      
    }, 2000)


  })

}

module.exports = {fetchDownloadLinks};