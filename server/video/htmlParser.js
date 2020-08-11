const cheerio = require("cheerio")

module.exports = {
  parse(host, html, selectorMap) {
    const { itemsContainer, title, img, time, watchCount, link } = selectorMap
    const $ = cheerio.load(html)
    // console.log("$(itemsContainer) ",$(itemsContainer))

    const res = []
    $(itemsContainer).each((index, item) => {
      // console.log("item ",item)
      item = $(item)
      res.push({
        title: item.find(title).text(),
        img: item.find(img).attr("src"),
        time: item.find(time).text(),
        watchCount: item.find(watchCount).text(),
        link: host + item.find(link).attr("href"),
      })
    })

    return res
  },
}
