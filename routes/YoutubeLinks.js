const express = require('express')
const axios = require('axios')
const router = express.Router()
const DownloadLinks = require('../src/DownloadLinks')

const youtubeApiString = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC1YXfs9bkaCnpWnD4XIGl-jsDV3S8RAcM'

const processYoutubeData = function(youtubeData){

  const videoIDs = youtubeData.items.map((e)=>{
   // console.log(youtubeData[0].snippet)
    return {id:e.id.videoId,
            title: e.snippet.title,
            pictureLink: e.snippet.thumbnails.default.url
          }
  })

  console.log(videoIDs)
  return videoIDs
}


router.get('/', (req, res, next) => {
  const searchQuery = req.query.q
  console.log('Search QUery:',searchQuery)
  let output = {}

  
  axios.get(youtubeApiString + '&part=snippet&type=video&q='+ searchQuery +'&maxResults=10')
  .then((response) => {
    const links = processYoutubeData(response['data'])
    output.links = links 

    res.send(output)
    return

    // DownloadLinks.fetchDownloadLinks(links,(returnData)=>{
    //   res.send(returnData)
    // })

  })
  .catch((error) => {
    output.err = error
    output.message = error.message
    res.send(output)
  })

})

router.get('/getLink',(req, res, next) => {
  const idToGetLink = req.query.id
  console.log('downlaodID:',idToGetLink)
  let output = {}
    DownloadLinks.fetchSingleDownloadLink(idToGetLink,(downloadLink)=>{
      res.send({downloadLink:downloadLink})
    })

})

module.exports = router

