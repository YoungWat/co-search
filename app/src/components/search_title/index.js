import React from "react"

const SearchTitle = ({ img, title }) => {
  return (
    <h1>
      <img src={img} alt="" />
      <span>{title}</span>
    </h1>
  )
}

export default SearchTitle
