module.exports = {
  searchList: [
    // bilibili
    {
      url: `https://search.bilibili.com/video?keyword={q}`,
      logo:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/055b8dfe5bf346c18ef4fec63031df09~tplv-k3u1fbpfcp-zoom-1.image",
      hostPre: "https:",
      selectorMap: {
        itemsContainer: ".video-list .video-item",
        title: ".info .title",
        img: ".img-anchor img",
        time: ".time",
        watchCount: ".watch-num",
        link: ".info .title",
      },
      parserPlugin: (html, index, oriImg) => {
        const jsonStr =
          html
            .match(/window.__INITIAL_STATE__=\{.*\};/)[0]
            .replace(/^window.__INITIAL_STATE__=/, "")
            .replace(/;$/, "") || "{}"
        const data = JSON.parse(jsonStr)
        const key = Object.keys(data.flow)[0]

        return {
          img: "https:" + data.flow[key].result[index].pic,
        }
      },
    },
    // xigua
    {
      url: `https://www.ixigua.com/search/{q}`,
      logo:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77d2ed73c54b40a3a4dd47491f7c6773~tplv-k3u1fbpfcp-zoom-1.image",
      hostPre: "https://www.ixigua.com",
      selectorMap: {
        itemsContainer: ".Search-Complex .VideoListItem",
        title: ".VideoListItem__info__title",
        img: ".BU-MagicImage",
        time: ".VideoListItem__info__time",
        watchCount: ".VideoListItem__info__watchCount",
        link: ".VideoListItem__info a",
      },
    },
    // tengxun
    {
      url: "https://v.qq.com/x/search/?q={q}",
      logo:"https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b2414d8eac3430b9ac40f20eb7636fa~tplv-k3u1fbpfcp-zoom-1.image",
      hostPre: "",
      selectorMap: {
        itemsContainer: ".wrapper_main .result_item_h",
        title: ".result_title",
        img: ".figure_pic",
        time: ".info_item .content",
        watchCount: "",
        link: ".result_figure",
      },
      parserPlugin: (html, index, oriImg) => {
        return {
          img: "https:" + oriImg,
        }
      },
    },
  ]
}
