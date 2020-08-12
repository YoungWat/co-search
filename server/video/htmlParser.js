const cheerio = require("cheerio")
const request = require("request")

// console.log("$(itemsContainer) ",$(itemsContainer))

const parseHtml = ({
  html = "",
  hostPre,
  selectorMap = {},
  size = 5,
  parserPlugin = () => {},
}) => {
  const $ = cheerio.load(html)
  const { itemsContainer, title, img, time, watchCount, link } = selectorMap
  const res = []

  $(itemsContainer)
    .slice(0, size)
    .each((index, item) => {
      item = $(item)
      res.push({
        title: item.find(title).text().trim(),
        img: item.find(img).attr("src"),
        time: item.find(time).text().trim(),
        watchCount: item.find(watchCount).text().trim(),
        link: hostPre + item.find(link).attr("href"),
        ...parserPlugin(html, index, item.find(img).attr("src")),
      })
    })

  return res
}

module.exports = {
  parse({ url, hostPre, selectorMap, size, parserPlugin }) {
    return new Promise((resolve, reject) => {
      // const url = `https://www.ixigua.com/search/${q}`
      request(
        {
          url,
          method: "get",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          },
        },
        (err, res, body) => {
          if (err) {
            reject()
          } else {
            const list = parseHtml({
              html: body,
              url,
              hostPre,
              selectorMap,
              size,
              parserPlugin,
            })
            const key = url.replace(/http[s]?:\/\/[\w]+\.([^\.]+)\..*/, "$1")
            resolve({
              [key]: {
                url,
                list,
              },
            })
          }
        }
      )
    })
  },
}
