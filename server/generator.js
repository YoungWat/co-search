const { searchList } = require("./video/config")
const htmlParser = require("./video/htmlParser")

module.exports = {
  generate: (q, size) => {
    return searchList.map((item, index) => {
      return htmlParser.parse({
        url: item.url.replace("{q}", q),
        hostPre: item.hostPre,
        selectorMap: item.selectorMap,
        size,
        parserPlugin: item.parserPlugin,
      })
    })
  },
}
