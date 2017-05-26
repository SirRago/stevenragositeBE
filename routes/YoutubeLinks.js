const express = require('express')
const axios = require('axios')
const router = express.Router()
const DownloadLinks = require('../src/DownloadLinks')

const youtubeApiString = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC1YXfs9bkaCnpWnD4XIGl-jsDV3S8RAcM'

const processYoutubeData = function(youtubeData){
  console.log(youtubeData.items)

  const videoIDs = youtubeData.items.map((e)=>{
    return {id:e.id.videoId,
            title: e.snippet.title}
  })

  return videoIDs
}


router.get('/', (req, res, next) => {
  const searchQuery = req.query.q
  let output = {}


  axios.get(youtubeApiString + '&part=snippet&type=video&q=get%20back&maxResults=1')
  .then((response) => {
    const links = processYoutubeData(response['data'])
    output.links = links 

    DownloadLinks.fetchDownloadLinks(links,(returnData)=>{
      res.send(returnData)
    })

   // res.send(output)


  })
  .catch((error) => {
    output.err = error
    output.message = error.message
    res.send(output)
  })



})

module.exports = router

