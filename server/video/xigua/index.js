const superagent = require("superagent")
const cheerio = require("cheerio")
const htmlParser = require("../htmlParser")

// superagent
//   .get(`https://www.ixigua.com/search/haha`)
//   .then((res) => {
//     const $ = cheerio.load(res.text)
//     fs.writeFileSync("t.html", $(".VideoListItem").html())

//     console.log($("html"))
//   })
//   .catch((err) => {
//     console.log("err ", err)
//     reject(err)
//   })

const xigua = (q) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(`https://www.ixigua.com/search/${q}`)
      .then((res) => {
        const info = htmlParser.parse("https://www.ixigua.com", res.text, {
          itemsContainer: ".Search-Complex .VideoListItem",
          title: ".VideoListItem__info__title",
          img: ".BU-MagicImage",
          time: ".VideoListItem__info__time",
          watchCount: ".VideoListItem__info__watchCount",
          link: ".withPreview a",
        })
        resolve(info)
      })
      .catch((err) => {
        console.log("err ", err)
        reject(err)
      })
  })
}

module.exports = xigua
