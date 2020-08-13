import React, { memo } from "react"

import "./index.scss"

const SearchItem = ({ data, search_q }) => {
  const englishReg = /\w+/
  const generateEnglishReg = (str) => {
    let regStr = ""
    str.split("").forEach((word) => {
      regStr += `[${word}${word.toUpperCase()}]`
    })
    return new RegExp(regStr)
  }

  const clickHandler = () => {
    window.open(data.link)
  }

  const replaceFlag = englishReg.test(search_q)
    ? generateEnglishReg(search_q)
    : search_q
  return (
    <section className="search-item">
      <div className="img-outer" onClick={clickHandler}>
        <img src={data.img} alt="" title={data.title} />
        <span className="duration">{data.duration}</span>
      </div>
      <div className="text">
        <p
          className="title"
          dangerouslySetInnerHTML={{
            __html: data.title.replace(replaceFlag, (match) => {
              return `<span class="red">${match}</span>`
            }),
          }}
          onClick={clickHandler}
        ></p>
        <p className="watch-info">
          <span className="watch-count">
            <i className="icon-watch-count"></i>
            {data.watchCount}
          </span>
          <span className="time">
            <i className="icon-time"></i>
            {data.time}
          </span>
        </p>
      </div>
    </section>
  )
}

export default memo(SearchItem, (prevProps, nextProps) => {
  const res = JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  return res
})
