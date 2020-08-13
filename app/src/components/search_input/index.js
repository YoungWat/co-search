import React, { memo, useEffect } from "react"
import cn from "classnames"

import "./index.scss"

const SerachInput = ({ type = "0", value = "", onInput, onSearch }) => {
  const inputHandler = (e) => {
    onInput && onInput(e.target.value)
  }

  const clickHandler = () => {
    onSearch && onSearch(value)
  }

  const keyDownHandler = (e) => {
    // 回车
    if (e.keyCode === 13) {
      onSearch(value)
    }
  }

  // type-0 未搜索居中 ,type-1，已搜索，顶部
  return (
    <section
      className={cn("search-input", {
        "search-input-top": type === "1",
      })}
    >
      <h1 className="logo-outer">
        <span className="logo"></span>
        <span className="logo-text">co search</span>
      </h1>
      <div className="input-outer">
        <input
          type="text"
          value={value}
          onInput={inputHandler}
          onChange={inputHandler}
          onKeyDown={keyDownHandler}
        />
        <button onClick={clickHandler}>搜索</button>
      </div>
    </section>
  )
}

export default memo(SerachInput)
